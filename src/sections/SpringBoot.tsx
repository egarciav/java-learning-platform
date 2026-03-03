import React from 'react';
import CodeExample from '../components/CodeExample';

const SpringBoot: React.FC = () => {
  const examples = [
    {
      title: "Introducción a Spring Boot",
      description: "Qué es Spring Boot y por qué es importante",
      code: `// Spring Boot es un framework que simplifica el desarrollo de aplicaciones Java

/*
¿Qué es Spring Boot?
- Framework basado en Spring Framework
- Configuración automática (auto-configuration)
- Servidor embebido (Tomcat, Jetty)
- Sin necesidad de archivos XML
- Desarrollo rápido de aplicaciones
- Ideal para microservicios y APIs REST

Ventajas:
1. Configuración mínima
2. Desarrollo rápido
3. Producción lista (production-ready)
4. Gran ecosistema
5. Amplia comunidad

Estructura de un proyecto Spring Boot:

proyecto-spring-boot/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── ejemplo/
│   │   │           ├── Application.java (clase principal)
│   │   │           ├── controller/
│   │   │           ├── service/
│   │   │           ├── repository/
│   │   │           └── model/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   └── test/
├── pom.xml (Maven) o build.gradle (Gradle)
└── README.md

Dependencias principales (pom.xml):
*/

// Ejemplo de pom.xml básico
/*
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.ejemplo</groupId>
    <artifactId>mi-aplicacion</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>
    
    <dependencies>
        <!-- Spring Boot Web para APIs REST -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Boot DevTools para desarrollo -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Spring Boot Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
*/`,
      explanation: "Spring Boot es un framework que simplifica enormemente el desarrollo de aplicaciones Java empresariales. Proporciona configuración automática, servidor embebido, y elimina la necesidad de configuración XML compleja. Es el estándar de la industria para crear microservicios, APIs REST, y aplicaciones web. La estructura del proyecto sigue convenciones claras que facilitan el mantenimiento y escalabilidad."
    },
    {
      title: "Clase Principal y Configuración",
      description: "Cómo iniciar una aplicación Spring Boot",
      code: `package com.ejemplo.miapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Anotación principal que combina @Configuration, @EnableAutoConfiguration y @ComponentScan
@SpringBootApplication
public class Application {
    
    // Método main - punto de entrada de la aplicación
    public static void main(String[] args) {
        // Inicia la aplicación Spring Boot
        SpringApplication.run(Application.class, args);
        System.out.println("Aplicación Spring Boot iniciada exitosamente!");
    }
    
    // Bean para configurar CORS (Cross-Origin Resource Sharing)
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                       .allowedOrigins("http://localhost:3000")
                       .allowedMethods("GET", "POST", "PUT", "DELETE")
                       .allowedHeaders("*");
            }
        };
    }
}

/*
Archivo: application.properties (en src/main/resources/)

# Configuración del servidor
server.port=8080
server.servlet.context-path=/api

# Configuración de la aplicación
spring.application.name=mi-aplicacion

# Configuración de logging
logging.level.root=INFO
logging.level.com.ejemplo=DEBUG
logging.file.name=logs/application.log

# Configuración de base de datos (H2 en memoria para desarrollo)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Configuración de JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Habilitar consola H2 (solo desarrollo)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Configuración de JSON
spring.jackson.serialization.indent-output=true
spring.jackson.default-property-inclusion=non_null
*/

/*
Archivo: application.yml (alternativa a .properties)

server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: mi-aplicacion
  
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: 
  
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: update
    show-sql: true
  
  h2:
    console:
      enabled: true
      path: /h2-console

logging:
  level:
    root: INFO
    com.ejemplo: DEBUG
  file:
    name: logs/application.log
*/`,
      explanation: "La clase principal con @SpringBootApplication es el punto de entrada de la aplicación. Esta anotación combina tres anotaciones importantes: @Configuration (define beans), @EnableAutoConfiguration (configura automáticamente Spring), y @ComponentScan (busca componentes). El archivo application.properties o application.yml permite configurar el servidor, base de datos, logging, y otros aspectos sin código. Spring Boot usa convención sobre configuración."
    },
    {
      title: "Controladores REST (Controllers)",
      description: "Crea endpoints HTTP para tu API",
      code: `package com.ejemplo.miapp.controller;

import com.ejemplo.miapp.model.Usuario;
import com.ejemplo.miapp.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController combina @Controller y @ResponseBody
@RestController
@RequestMapping("/usuarios") // Ruta base para todos los endpoints
public class UsuarioController {
    
    // Inyección de dependencias
    @Autowired
    private UsuarioService usuarioService;
    
    // GET /usuarios - Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodos() {
        List<Usuario> usuarios = usuarioService.obtenerTodos();
        return ResponseEntity.ok(usuarios);
    }
    
    // GET /usuarios/{id} - Obtener usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.obtenerPorId(id);
        
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // GET /usuarios/buscar?nombre=Juan - Buscar por query parameter
    @GetMapping("/buscar")
    public ResponseEntity<List<Usuario>> buscarPorNombre(@RequestParam String nombre) {
        List<Usuario> usuarios = usuarioService.buscarPorNombre(nombre);
        return ResponseEntity.ok(usuarios);
    }
    
    // POST /usuarios - Crear nuevo usuario
    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.crear(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }
    
    // PUT /usuarios/{id} - Actualizar usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(
            @PathVariable Long id, 
            @RequestBody Usuario usuario) {
        
        Usuario usuarioActualizado = usuarioService.actualizar(id, usuario);
        
        if (usuarioActualizado != null) {
            return ResponseEntity.ok(usuarioActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // DELETE /usuarios/{id} - Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = usuarioService.eliminar(id);
        
        if (eliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // PATCH /usuarios/{id}/activar - Activar usuario
    @PatchMapping("/{id}/activar")
    public ResponseEntity<Usuario> activar(@PathVariable Long id) {
        Usuario usuario = usuarioService.activar(id);
        
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Manejo de excepciones específico del controlador
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> manejarArgumentoInvalido(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

/*
Anotaciones importantes:

@RestController: Marca la clase como controlador REST
@RequestMapping: Define la ruta base
@GetMapping: Maneja peticiones GET
@PostMapping: Maneja peticiones POST
@PutMapping: Maneja peticiones PUT
@DeleteMapping: Maneja peticiones DELETE
@PatchMapping: Maneja peticiones PATCH

@PathVariable: Extrae variables de la URL
@RequestParam: Extrae parámetros de query
@RequestBody: Convierte JSON del cuerpo a objeto Java
@RequestHeader: Extrae headers HTTP

ResponseEntity: Permite controlar el código de estado HTTP y headers
*/`,
      explanation: "Los controladores REST manejan las peticiones HTTP y devuelven respuestas. @RestController combina @Controller y @ResponseBody, convirtiendo automáticamente objetos Java a JSON. Las anotaciones de mapeo (@GetMapping, @PostMapping, etc.) definen qué método HTTP maneja cada endpoint. @PathVariable extrae valores de la URL, @RequestParam de query strings, y @RequestBody convierte JSON a objetos. ResponseEntity permite control completo sobre la respuesta HTTP."
    },
    {
      title: "Modelos y Entidades JPA",
      description: "Define tus entidades de base de datos",
      code: `package com.ejemplo.miapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// @Entity marca la clase como entidad JPA (tabla en BD)
@Entity
@Table(name = "usuarios") // Nombre de la tabla
public class Usuario {
    
    // @Id marca el campo como clave primaria
    // @GeneratedValue indica que el valor se genera automáticamente
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // @Column personaliza la columna
    @Column(name = "nombre", nullable = false, length = 100)
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String nombre;
    
    @Column(unique = true, nullable = false)
    @Email(message = "Email debe ser válido")
    @NotBlank(message = "El email es obligatorio")
    private String email;
    
    @Column(nullable = false)
    @Min(value = 18, message = "La edad mínima es 18")
    @Max(value = 120, message = "La edad máxima es 120")
    private Integer edad;
    
    @Column(name = "activo")
    private Boolean activo = true;
    
    // @JsonIgnore evita que este campo se serialice a JSON
    @JsonIgnore
    @Column(nullable = false)
    private String password;
    
    // Campos de auditoría
    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;
    
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;
    
    // Relación uno a muchos
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Pedido> pedidos = new ArrayList<>();
    
    // Métodos de ciclo de vida
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
    
    // Constructores
    public Usuario() {
        // Constructor vacío requerido por JPA
    }
    
    public Usuario(String nombre, String email, Integer edad) {
        this.nombre = nombre;
        this.email = email;
        this.edad = edad;
    }
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Integer getEdad() {
        return edad;
    }
    
    public void setEdad(Integer edad) {
        this.edad = edad;
    }
    
    public Boolean getActivo() {
        return activo;
    }
    
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
    
    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }
    
    public List<Pedido> getPedidos() {
        return pedidos;
    }
    
    public void setPedidos(List<Pedido> pedidos) {
        this.pedidos = pedidos;
    }
    
    // Métodos de utilidad
    public void agregarPedido(Pedido pedido) {
        pedidos.add(pedido);
        pedido.setUsuario(this);
    }
    
    public void removerPedido(Pedido pedido) {
        pedidos.remove(pedido);
        pedido.setUsuario(null);
    }
    
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\\'' +
                ", email='" + email + '\\'' +
                ", edad=" + edad +
                ", activo=" + activo +
                '}';
    }
}

// Entidad relacionada
@Entity
@Table(name = "pedidos")
class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String descripcion;
    
    @Column(nullable = false)
    private Double total;
    
    // Relación muchos a uno
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @Column(name = "fecha_pedido")
    private LocalDateTime fechaPedido;
    
    @PrePersist
    protected void onCreate() {
        fechaPedido = LocalDateTime.now();
    }
    
    // Constructor, getters y setters
    public Pedido() {}
    
    public Pedido(String descripcion, Double total) {
        this.descripcion = descripcion;
        this.total = total;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public Double getTotal() {
        return total;
    }
    
    public void setTotal(Double total) {
        this.total = total;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public LocalDateTime getFechaPedido() {
        return fechaPedido;
    }
}`,
      explanation: "Las entidades JPA representan tablas en la base de datos. @Entity marca la clase como entidad, @Table define el nombre de la tabla, @Id marca la clave primaria, y @GeneratedValue genera valores automáticamente. @Column personaliza columnas. Las validaciones (@NotBlank, @Email, @Min, @Max) validan datos automáticamente. Las relaciones (@OneToMany, @ManyToOne) mapean relaciones entre tablas. @PrePersist y @PreUpdate ejecutan código antes de guardar/actualizar."
    },
    {
      title: "Repositorios (Data Access Layer)",
      description: "Accede a la base de datos sin escribir SQL",
      code: `package com.ejemplo.miapp.repository;

import com.ejemplo.miapp.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// @Repository marca la interfaz como repositorio
// JpaRepository<Entidad, TipoID> proporciona métodos CRUD automáticos
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Métodos derivados de nombres (Spring Data JPA los implementa automáticamente)
    
    // Buscar por email
    Optional<Usuario> findByEmail(String email);
    
    // Buscar por nombre (ignora mayúsculas/minúsculas)
    List<Usuario> findByNombreIgnoreCase(String nombre);
    
    // Buscar por nombre que contenga un texto
    List<Usuario> findByNombreContaining(String texto);
    
    // Buscar usuarios activos
    List<Usuario> findByActivoTrue();
    
    // Buscar usuarios inactivos
    List<Usuario> findByActivoFalse();
    
    // Buscar por edad mayor o igual
    List<Usuario> findByEdadGreaterThanEqual(Integer edad);
    
    // Buscar por edad entre dos valores
    List<Usuario> findByEdadBetween(Integer edadMin, Integer edadMax);
    
    // Buscar por nombre y activo
    List<Usuario> findByNombreAndActivo(String nombre, Boolean activo);
    
    // Buscar por nombre o email
    List<Usuario> findByNombreOrEmail(String nombre, String email);
    
    // Ordenar por nombre ascendente
    List<Usuario> findAllByOrderByNombreAsc();
    
    // Ordenar por edad descendente
    List<Usuario> findAllByOrderByEdadDesc();
    
    // Contar usuarios activos
    Long countByActivoTrue();
    
    // Verificar si existe por email
    Boolean existsByEmail(String email);
    
    // Eliminar por email
    void deleteByEmail(String email);
    
    // Consultas personalizadas con @Query (JPQL)
    
    @Query("SELECT u FROM Usuario u WHERE u.nombre LIKE %:nombre%")
    List<Usuario> buscarPorNombrePersonalizado(@Param("nombre") String nombre);
    
    @Query("SELECT u FROM Usuario u WHERE u.edad >= :edadMinima AND u.activo = true")
    List<Usuario> buscarUsuariosActivosMayoresDe(@Param("edadMinima") Integer edadMinima);
    
    @Query("SELECT u FROM Usuario u WHERE u.email = :email AND u.activo = true")
    Optional<Usuario> buscarUsuarioActivoPorEmail(@Param("email") String email);
    
    // Consulta nativa SQL
    @Query(value = "SELECT * FROM usuarios WHERE edad > ?1 ORDER BY nombre", nativeQuery = true)
    List<Usuario> buscarMayoresDe(Integer edad);
    
    // Consulta con proyección (solo algunos campos)
    @Query("SELECT u.nombre, u.email FROM Usuario u WHERE u.activo = true")
    List<Object[]> obtenerNombresYEmailsActivos();
    
    // Actualización personalizada
    @Query("UPDATE Usuario u SET u.activo = :activo WHERE u.id = :id")
    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.transaction.annotation.Transactional
    int actualizarEstado(@Param("id") Long id, @Param("activo") Boolean activo);
}

/*
Métodos heredados de JpaRepository (disponibles automáticamente):

- save(S entity): Guarda o actualiza una entidad
- saveAll(Iterable<S> entities): Guarda múltiples entidades
- findById(ID id): Busca por ID
- existsById(ID id): Verifica si existe por ID
- findAll(): Obtiene todas las entidades
- findAllById(Iterable<ID> ids): Busca múltiples por IDs
- count(): Cuenta todas las entidades
- deleteById(ID id): Elimina por ID
- delete(T entity): Elimina una entidad
- deleteAll(): Elimina todas las entidades
- flush(): Sincroniza con la base de datos

Palabras clave para métodos derivados:

- find...By, read...By, get...By, query...By, search...By, stream...By
- count...By
- exists...By
- delete...By, remove...By
- ...First<number>..., ...Top<number>...
- ...Distinct...
- And, Or
- Is, Equals
- Between
- LessThan, LessThanEqual
- GreaterThan, GreaterThanEqual
- After, Before
- IsNull, IsNotNull, NotNull
- Like, NotLike
- StartingWith, EndingWith, Containing
- OrderBy
- Not, In, NotIn
- True, False
- IgnoreCase
*/`,
      explanation: "Los repositorios proporcionan acceso a datos sin escribir SQL. Extendiendo JpaRepository obtienes métodos CRUD automáticos. Spring Data JPA implementa automáticamente métodos basados en sus nombres (findByNombre, findByEdadGreaterThan, etc.). @Query permite consultas JPQL personalizadas. Las consultas nativas SQL se marcan con nativeQuery=true. Los repositorios siguen el patrón Repository y simplifican enormemente el acceso a datos."
    },
    {
      title: "Servicios (Business Logic Layer)",
      description: "Implementa la lógica de negocio de tu aplicación",
      code: `package com.ejemplo.miapp.service;

import com.ejemplo.miapp.model.Usuario;
import com.ejemplo.miapp.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

// @Service marca la clase como servicio (capa de lógica de negocio)
@Service
@Transactional // Todas las operaciones son transaccionales
public class UsuarioService {
    
    // Inyección de dependencias del repositorio
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // Obtener todos los usuarios
    @Transactional(readOnly = true) // Optimización para solo lectura
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }
    
    // Obtener usuario por ID
    @Transactional(readOnly = true)
    public Usuario obtenerPorId(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.orElse(null);
    }
    
    // Buscar por nombre
    @Transactional(readOnly = true)
    public List<Usuario> buscarPorNombre(String nombre) {
        return usuarioRepository.findByNombreContaining(nombre);
    }
    
    // Crear nuevo usuario
    public Usuario crear(Usuario usuario) {
        // Validaciones de negocio
        if (usuario.getNombre() == null || usuario.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        
        if (usuario.getEmail() == null || usuario.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("El email es obligatorio");
        }
        
        // Verificar que el email no exista
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        
        // Validar edad
        if (usuario.getEdad() == null || usuario.getEdad() < 18) {
            throw new IllegalArgumentException("La edad debe ser mayor o igual a 18");
        }
        
        // Establecer valores por defecto
        if (usuario.getActivo() == null) {
            usuario.setActivo(true);
        }
        
        // Guardar en la base de datos
        return usuarioRepository.save(usuario);
    }
    
    // Actualizar usuario existente
    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        // Buscar usuario existente
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);
        
        if (usuarioExistente.isEmpty()) {
            return null;
        }
        
        Usuario usuario = usuarioExistente.get();
        
        // Actualizar campos
        if (usuarioActualizado.getNombre() != null) {
            usuario.setNombre(usuarioActualizado.getNombre());
        }
        
        if (usuarioActualizado.getEmail() != null) {
            // Verificar que el nuevo email no esté en uso por otro usuario
            Optional<Usuario> usuarioConEmail = usuarioRepository.findByEmail(usuarioActualizado.getEmail());
            if (usuarioConEmail.isPresent() && !usuarioConEmail.get().getId().equals(id)) {
                throw new IllegalArgumentException("El email ya está en uso");
            }
            usuario.setEmail(usuarioActualizado.getEmail());
        }
        
        if (usuarioActualizado.getEdad() != null) {
            if (usuarioActualizado.getEdad() < 18) {
                throw new IllegalArgumentException("La edad debe ser mayor o igual a 18");
            }
            usuario.setEdad(usuarioActualizado.getEdad());
        }
        
        if (usuarioActualizado.getActivo() != null) {
            usuario.setActivo(usuarioActualizado.getActivo());
        }
        
        // Guardar cambios
        return usuarioRepository.save(usuario);
    }
    
    // Eliminar usuario
    public boolean eliminar(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Activar usuario
    public Usuario activar(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        
        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            u.setActivo(true);
            return usuarioRepository.save(u);
        }
        
        return null;
    }
    
    // Desactivar usuario
    public Usuario desactivar(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        
        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            u.setActivo(false);
            return usuarioRepository.save(u);
        }
        
        return null;
    }
    
    // Obtener usuarios activos
    @Transactional(readOnly = true)
    public List<Usuario> obtenerActivos() {
        return usuarioRepository.findByActivoTrue();
    }
    
    // Obtener usuarios por rango de edad
    @Transactional(readOnly = true)
    public List<Usuario> obtenerPorRangoEdad(Integer edadMin, Integer edadMax) {
        return usuarioRepository.findByEdadBetween(edadMin, edadMax);
    }
    
    // Contar usuarios activos
    @Transactional(readOnly = true)
    public Long contarActivos() {
        return usuarioRepository.countByActivoTrue();
    }
    
    // Verificar si existe email
    @Transactional(readOnly = true)
    public boolean existeEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }
}

/*
Buenas prácticas en servicios:

1. Usar @Service para marcar la clase
2. Usar @Transactional para gestión de transacciones
3. Usar @Transactional(readOnly = true) para operaciones de solo lectura
4. Implementar validaciones de negocio
5. Manejar excepciones apropiadamente
6. Separar lógica de negocio de acceso a datos
7. Mantener métodos pequeños y enfocados
8. Documentar métodos complejos
9. Usar Optional para valores que pueden ser nulos
10. Lanzar excepciones descriptivas

Inyección de dependencias:
- @Autowired: inyección por campo (más común)
- Constructor: inyección por constructor (recomendado)
- Setter: inyección por setter
*/`,
      explanation: "Los servicios contienen la lógica de negocio de la aplicación. @Service marca la clase como componente de servicio. @Transactional gestiona transacciones automáticamente, asegurando que las operaciones se completen o reviertan en conjunto. Los servicios validan datos, aplican reglas de negocio, y coordinan operaciones entre repositorios. Separan la lógica de negocio de los controladores y repositorios, siguiendo el principio de responsabilidad única."
    },
    {
      title: "Manejo Global de Excepciones",
      description: "Gestiona errores de forma centralizada",
      code: `package com.ejemplo.miapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

// @RestControllerAdvice maneja excepciones globalmente
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    // Clase para respuestas de error estandarizadas
    public static class ErrorResponse {
        private LocalDateTime timestamp;
        private int status;
        private String error;
        private String message;
        private String path;
        
        public ErrorResponse(int status, String error, String message, String path) {
            this.timestamp = LocalDateTime.now();
            this.status = status;
            this.error = error;
            this.message = message;
            this.path = path;
        }
        
        // Getters y setters
        public LocalDateTime getTimestamp() {
            return timestamp;
        }
        
        public void setTimestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
        }
        
        public int getStatus() {
            return status;
        }
        
        public void setStatus(int status) {
            this.status = status;
        }
        
        public String getError() {
            return error;
        }
        
        public void setError(String error) {
            this.error = error;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
        
        public String getPath() {
            return path;
        }
        
        public void setPath(String path) {
            this.path = path;
        }
    }
    
    // Manejar IllegalArgumentException (400 Bad Request)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> manejarArgumentoInvalido(
            IllegalArgumentException ex, 
            WebRequest request) {
        
        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Bad Request",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    // Manejar excepciones de validación (400 Bad Request)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> manejarValidacion(
            MethodArgumentNotValidException ex,
            WebRequest request) {
        
        Map<String, Object> response = new HashMap<>();
        Map<String, String> errores = new HashMap<>();
        
        // Extraer errores de validación
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String campo = ((FieldError) error).getField();
            String mensaje = error.getDefaultMessage();
            errores.put(campo, mensaje);
        });
        
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("error", "Validation Failed");
        response.put("errores", errores);
        response.put("path", request.getDescription(false).replace("uri=", ""));
        
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    // Manejar NullPointerException (500 Internal Server Error)
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorResponse> manejarNullPointer(
            NullPointerException ex,
            WebRequest request) {
        
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Internal Server Error",
            "Se produjo un error interno. Por favor, contacte al administrador.",
            request.getDescription(false).replace("uri=", "")
        );
        
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    // Manejar excepciones genéricas (500 Internal Server Error)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> manejarExcepcionGeneral(
            Exception ex,
            WebRequest request) {
        
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Internal Server Error",
            "Ocurrió un error inesperado: " + ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    // Excepción personalizada para recursos no encontrados
    public static class RecursoNoEncontradoException extends RuntimeException {
        public RecursoNoEncontradoException(String mensaje) {
            super(mensaje);
        }
    }
    
    // Manejar RecursoNoEncontradoException (404 Not Found)
    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<ErrorResponse> manejarRecursoNoEncontrado(
            RecursoNoEncontradoException ex,
            WebRequest request) {
        
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            "Not Found",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}

/*
Códigos de estado HTTP comunes:

200 OK - Solicitud exitosa
201 Created - Recurso creado exitosamente
204 No Content - Solicitud exitosa sin contenido
400 Bad Request - Solicitud inválida
401 Unauthorized - No autenticado
403 Forbidden - No autorizado
404 Not Found - Recurso no encontrado
409 Conflict - Conflicto (ej: email duplicado)
500 Internal Server Error - Error del servidor

Uso en el servicio:

public Usuario obtenerPorId(Long id) {
    return usuarioRepository.findById(id)
        .orElseThrow(() -> new RecursoNoEncontradoException(
            "Usuario no encontrado con ID: " + id));
}
*/`,
      explanation: "@RestControllerAdvice permite manejar excepciones globalmente en toda la aplicación. @ExceptionHandler define métodos que manejan tipos específicos de excepciones. Esto centraliza el manejo de errores, evita código repetitivo, y proporciona respuestas consistentes. Las respuestas de error estandarizadas incluyen timestamp, código de estado, mensaje, y ruta. Es una práctica esencial para APIs REST profesionales."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Spring Boot</h1>
        <p className="text-lg text-gray-600 mb-6">
          El framework empresarial más popular de Java para crear aplicaciones modernas.
        </p>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-gray-800">
                <strong>¡Has llegado al nivel profesional!</strong> Spring Boot es el estándar 
                de la industria para desarrollo Java empresarial. Con estos conocimientos podrás 
                crear APIs REST, microservicios, y aplicaciones web completas listas para producción.
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

      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 p-6">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              🎯 Proyecto Final Completo
            </h3>
            <p className="text-sm text-purple-800 mb-4">
              Crea una API REST completa de gestión de tareas con Spring Boot que incluya:
            </p>
            <ul className="list-disc list-inside text-sm text-purple-800 space-y-1">
              <li>Entidades: Usuario, Tarea, Categoría</li>
              <li>Repositorios con consultas personalizadas</li>
              <li>Servicios con lógica de negocio y validaciones</li>
              <li>Controladores REST con todos los endpoints CRUD</li>
              <li>Manejo global de excepciones</li>
              <li>Validaciones con Bean Validation</li>
              <li>Relaciones entre entidades (OneToMany, ManyToOne)</li>
              <li>Paginación y ordenamiento</li>
              <li>Documentación con Swagger/OpenAPI</li>
            </ul>
            <p className="text-sm text-purple-800 mt-4">
              <strong>¡Felicitaciones!</strong> Con este proyecto demostrarás dominio completo 
              de Java desde conceptos básicos hasta desarrollo empresarial con Spring Boot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringBoot;
