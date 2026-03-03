import React from 'react';
import CodeExample from '../components/CodeExample';

const SpringCore: React.FC = () => {
  const iocCode = `// INVERSIÓN DE CONTROL (IoC) Y CONTENEDOR SPRING

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Interfaz para desacoplar
interface MessageService {
    void enviarMensaje(String destinatario, String mensaje);
}

// Implementación de email
class EmailServiceImpl implements MessageService {
    @Override
    public void enviarMensaje(String destinatario, String mensaje) {
        System.out.println("Email a " + destinatario + ": " + mensaje);
    }
}

// Servicio de notificaciones CON IoC
class NotificationService {
    private final MessageService messageService;
    
    public NotificationService(MessageService messageService) {
        this.messageService = messageService;
    }
    
    public void notificar(String usuario, String mensaje) {
        messageService.enviarMensaje(usuario, mensaje);
    }
}

// Configuración de Spring
@Configuration
public class AppConfig {
    @Bean
    public MessageService messageService() {
        return new EmailServiceImpl();
    }
    
    @Bean
    public NotificationService notificationService() {
        return new NotificationService(messageService());
    }
}

// Uso del contenedor Spring
public class IoC_Demo {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        NotificationService service = context.getBean(NotificationService.class);
        service.notificar("usuario@email.com", "Hola con Spring");
    }
}`;

  const diCode = `// INYECCIÓN DE DEPENDENCIAS

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Repository;

@Repository
class UsuarioRepository {
    public void guardar(String usuario) {
        System.out.println("Guardando usuario: " + usuario);
    }
}

// 1. INYECCIÓN POR CONSTRUCTOR (RECOMENDADO)
@Service
class UsuarioServiceConstructor {
    private final UsuarioRepository usuarioRepository;
    
    public UsuarioServiceConstructor(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    
    public void procesar(String nombre) {
        usuarioRepository.guardar(nombre);
    }
}

// 2. INYECCIÓN POR SETTER
@Service
class UsuarioServiceSetter {
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    public void setUsuarioRepository(UsuarioRepository repo) {
        this.usuarioRepository = repo;
    }
}

// 3. INYECCIÓN POR CAMPO (NO RECOMENDADO)
@Service
class UsuarioServiceField {
    @Autowired
    private UsuarioRepository usuarioRepository;
}

// MÚLTIPLES IMPLEMENTACIONES CON @QUALIFIER
interface NotificationService {
    void enviar(String mensaje);
}

@Component
@Primary
class EmailNotificationService implements NotificationService {
    public void enviar(String mensaje) {
        System.out.println("Email: " + mensaje);
    }
}

@Component
class SMSNotificationService implements NotificationService {
    public void enviar(String mensaje) {
        System.out.println("SMS: " + mensaje);
    }
}

@Service
class NotificationManager {
    private final NotificationService emailService;
    private final NotificationService smsService;
    
    public NotificationManager(
            @Qualifier("emailNotificationService") NotificationService emailService,
            @Qualifier("smsNotificationService") NotificationService smsService) {
        this.emailService = emailService;
        this.smsService = smsService;
    }
}`;

  const beansCode = `// BEANS Y SCOPES

import org.springframework.context.annotation.*;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

// SINGLETON (por defecto)
@Component
@Scope("singleton")
class SingletonBean {
    private int contador = 0;
    
    public int incrementar() {
        return ++contador;
    }
}

// PROTOTYPE
@Component
@Scope("prototype")
class PrototypeBean {
    private int contador = 0;
    
    public int incrementar() {
        return ++contador;
    }
}

// CICLO DE VIDA DE BEANS
@Component
class BeanConCicloDeVida {
    private String nombre;
    
    public BeanConCicloDeVida() {
        System.out.println("1. Constructor llamado");
    }
    
    @Autowired(required = false)
    public void setDependencia(SingletonBean bean) {
        System.out.println("2. Dependencias inyectadas");
    }
    
    @PostConstruct
    public void init() {
        System.out.println("3. PostConstruct - Inicialización");
        this.nombre = "Bean Inicializado";
    }
    
    @PreDestroy
    public void cleanup() {
        System.out.println("4. PreDestroy - Limpieza");
    }
}

// CONFIGURACIÓN CON @BEAN
@Configuration
class BeanConfiguration {
    @Bean
    public String appName() {
        return "Mi Aplicación Spring";
    }
    
    @Bean(initMethod = "inicializar", destroyMethod = "limpiar")
    public RecursoExterno recursoExterno() {
        return new RecursoExterno();
    }
    
    @Bean
    @Profile("desarrollo")
    public BaseDatos baseDatosDesarrollo() {
        return new BaseDatos("localhost", "dev_db");
    }
    
    @Bean
    @Lazy
    public RecursoPesado recursoPesado() {
        return new RecursoPesado();
    }
}`;

  const examples = [
    {
      title: "Inversión de Control (IoC) y Contenedor Spring",
      description: "Entendiendo el concepto fundamental de Spring",
      code: iocCode,
      explanation: "Inversión de Control (IoC) significa que Spring controla la creación y gestión de objetos en lugar del programador. El contenedor de Spring (ApplicationContext) gestiona beans, resuelve dependencias, y controla el ciclo de vida. @Configuration marca clases de configuración, @Bean define beans gestionados por Spring. IoC reduce acoplamiento, mejora testabilidad y facilita mantenimiento. En lugar de crear objetos con 'new', los obtenemos del contenedor con getBean(). Spring inyecta dependencias automáticamente."
    },
    {
      title: "Inyección de Dependencias (DI) - Todas las Formas",
      description: "Constructor, Setter, Field injection y mejores prácticas",
      code: diCode,
      explanation: "La Inyección de Dependencias (DI) es cómo Spring proporciona dependencias a los componentes. Hay 3 formas: Constructor (recomendado, dependencias inmutables con final), Setter (dependencias opcionales), y Field (no recomendado, difícil de testear). @Autowired marca puntos de inyección. @Qualifier selecciona implementación específica cuando hay múltiples. @Primary marca implementación por defecto. Constructor injection es mejor práctica: testeable, inmutable, dependencias claras."
    },
    {
      title: "Beans y Scopes - Ciclo de Vida",
      description: "Alcance de beans, ciclo de vida y configuración avanzada",
      code: beansCode,
      explanation: "Los beans son objetos gestionados por Spring. Los scopes definen el ciclo de vida: SINGLETON (una instancia, default), PROTOTYPE (nueva instancia cada vez). El ciclo de vida es: Constructor → Inyección → @PostConstruct → Uso → @PreDestroy. @PostConstruct ejecuta después de inyección, @PreDestroy antes de destruir. @Bean en @Configuration define beans programáticamente. @Lazy retrasa creación hasta primer uso. @Profile crea beans condicionalmente. Singleton debe ser thread-safe, prototype no."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Spring Core - IoC, DI y Beans</h1>
        <p className="text-lg text-gray-600 mb-6">
          Los fundamentos de Spring Framework: Inversión de Control, Inyección de Dependencias y gestión de Beans.
        </p>
        
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>Spring Core:</strong> Es el corazón de Spring Framework. Proporciona IoC y DI,
                que son los pilares sobre los que se construyen todas las demás funcionalidades de Spring
                (Spring Boot, Spring MVC, Spring Data, etc.). Dominar estos conceptos es esencial.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {examples.map((example, index) => (
          <CodeExample
            key={index}
            title={example.title}
            description={example.description}
            code={example.code}
            explanation={example.explanation}
          />
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Transición a Spring Boot:</strong> Spring Boot usa estos mismos conceptos pero
              con configuración automática. Todo lo que aprendiste aquí (IoC, DI, Beans, Scopes)
              aplica directamente en Spring Boot. La diferencia es que Spring Boot configura muchas
              cosas automáticamente por ti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringCore;
