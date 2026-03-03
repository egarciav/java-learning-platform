import React from 'react';
import CodeExample from '../components/CodeExample';

const ObjectOrientedProgramming: React.FC = () => {
  const examples = [
    {
      title: "Clases y Objetos",
      description: "Los fundamentos de la Programación Orientada a Objetos",
      code: `// Clases y Objetos en Java

// Definición de una clase
public class Persona {
    // Atributos (variables de instancia)
    private String nombre;
    private int edad;
    private String email;
    
    // Constructor: inicializa objetos
    public Persona(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.email = ""; // Email opcional
    }
    
    // Constructor sobrecargado
    public Persona(String nombre, int edad, String email) {
        this.nombre = nombre;
        this.edad = edad;
        this.email = email;
    }
    
    // Métodos (comportamientos)
    public void presentarse() {
        System.out.println("Hola, soy " + nombre + " y tengo " + edad + " años.");
    }
    
    public void cumplirAnios() {
        edad++;
        System.out.println("¡Feliz cumpleaños! Ahora tengo " + edad + " años.");
    }
    
    // Getters y Setters (métodos de acceso)
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public int getEdad() {
        return edad;
    }
    
    public void setEdad(int edad) {
        if (edad > 0) { // Validación
            this.edad = edad;
        }
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    // Método toString para representación del objeto
    @Override
    public String toString() {
        return "Persona{nombre='" + nombre + "', edad=" + edad + ", email='" + email + "'}";
    }
}

// Uso de la clase
class Main {
    public static void main(String[] args) {
        // Crear objetos (instancias de la clase)
        Persona persona1 = new Persona("Ana", 25);
        Persona persona2 = new Persona("Juan", 30, "juan@email.com");
        
        // Usar métodos
        persona1.presentarse();
        persona2.presentarse();
        
        persona1.cumplirAnios();
        
        // Acceder a través de getters
        System.out.println("Nombre: " + persona1.getNombre());
        System.out.println("Edad: " + persona1.getEdad());
        
        // Modificar a través de setters
        persona1.setEmail("ana@email.com");
        System.out.println(persona1.toString());
    }
}`,
      explanation: "Una clase es una plantilla que define atributos (datos) y métodos (comportamientos). Un objeto es una instancia de una clase. Los constructores inicializan objetos cuando se crean. Los getters y setters controlan el acceso a los atributos (encapsulamiento). El modificador 'private' hace que los atributos solo sean accesibles dentro de la clase, protegiendo los datos."
    },
    {
      title: "Herencia",
      description: "Crea jerarquías de clases y reutiliza código",
      code: `// Herencia en Java

// Clase base (superclase)
public class Animal {
    protected String nombre;
    protected int edad;
    
    public Animal(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    
    public void comer() {
        System.out.println(nombre + " está comiendo");
    }
    
    public void dormir() {
        System.out.println(nombre + " está durmiendo");
    }
    
    public void hacerSonido() {
        System.out.println(nombre + " hace un sonido genérico");
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public int getEdad() {
        return edad;
    }
}

// Clases derivadas (subclases)
public class Perro extends Animal {
    private String raza;
    
    public Perro(String nombre, int edad, String raza) {
        super(nombre, edad); // Llama al constructor de la superclase
        this.raza = raza;
    }
    
    // Sobrescritura de método (override)
    @Override
    public void hacerSonido() {
        System.out.println(nombre + " dice: ¡Guau! ¡Guau!");
    }
    
    // Método específico de Perro
    public void ladrar() {
        System.out.println(nombre + " está ladrando fuertemente");
    }
    
    public void moverCola() {
        System.out.println(nombre + " está moviendo la cola");
    }
    
    public String getRaza() {
        return raza;
    }
}

public class Gato extends Animal {
    private boolean esDomestico;
    
    public Gato(String nombre, int edad, boolean esDomestico) {
        super(nombre, edad);
        this.esDomestico = esDomestico;
    }
    
    @Override
    public void hacerSonido() {
        System.out.println(nombre + " dice: Miau");
    }
    
    public void maullar() {
        System.out.println(nombre + " está maullando suavemente");
    }
    
    public void arañar() {
        System.out.println(nombre + " está arañando el sofá");
    }
    
    public boolean esDomestico() {
        return esDomestico;
    }
}

// Uso de la herencia
class Main {
    public static void main(String[] args) {
        Perro miPerro = new Perro("Fido", 3, "Labrador");
        Gato miGato = new Gato("Michi", 2, true);
        
        // Métodos heredados de Animal
        miPerro.comer();
        miGato.dormir();
        
        // Métodos sobrescritos
        miPerro.hacerSonido(); // Output: Fido dice: ¡Guau! ¡Guau!
        miGato.hacerSonido();  // Output: Michi dice: Miau
        
        // Métodos específicos
        miPerro.ladrar();
        miGato.arañar();
        
        // Polimorfismo
        Animal animal1 = new Perro("Bobby", 5, "Poodle");
        Animal animal2 = new Gato("Luna", 1, true);
        
        animal1.hacerSonido(); // Llama al método de Perro
        animal2.hacerSonido(); // Llama al método de Gato
    }
}`,
      explanation: "La herencia permite que una clase (subclase) herede atributos y métodos de otra clase (superclase). 'extends' establece la relación de herencia. 'super()' llama al constructor de la superclase. '@Override' indica que estamos sobrescribiendo un método. El polimorfismo permite tratar objetos de diferentes subclases como objetos de la superclase, llamando a los métodos sobrescritos correspondientes."
    },
    {
      title: "Polimorfismo",
      description: "Un objeto puede tomar muchas formas",
      code: `// Polimorfismo en Java

// Clase base abstracta
abstract public class Figura {
    protected String color;
    
    public Figura(String color) {
        this.color = color;
    }
    
    // Método abstracto (debe ser implementado por subclases)
    public abstract double calcularArea();
    
    public abstract double calcularPerimetro();
    
    // Método concreto (puede ser usado directamente)
    public void pintar() {
        System.out.println("Pintando figura de color " + color);
    }
    
    public String getColor() {
        return color;
    }
}

// Subclases concretas
public class Circulo extends Figura {
    private double radio;
    
    public Circulo(String color, double radio) {
        super(color);
        this.radio = radio;
    }
    
    @Override
    public double calcularArea() {
        return Math.PI * radio * radio;
    }
    
    @Override
    public double calcularPerimetro() {
        return 2 * Math.PI * radio;
    }
    
    public double getRadio() {
        return radio;
    }
}

public class Rectangulo extends Figura {
    private double base;
    private double altura;
    
    public Rectangulo(String color, double base, double altura) {
        super(color);
        this.base = base;
        this.altura = altura;
    }
    
    @Override
    public double calcularArea() {
        return base * altura;
    }
    
    @Override
    public double calcularPerimetro() {
        return 2 * (base + altura);
    }
    
    public double getBase() {
        return base;
    }
    
    public double getAltura() {
        return altura;
    }
}

public class Triangulo extends Figura {
    private double base;
    private double altura;
    private double lado1;
    private double lado2;
    private double lado3;
    
    public Triangulo(String color, double base, double altura, 
                     double lado1, double lado2, double lado3) {
        super(color);
        this.base = base;
        this.altura = altura;
        this.lado1 = lado1;
        this.lado2 = lado2;
        this.lado3 = lado3;
    }
    
    @Override
    public double calcularArea() {
        return (base * altura) / 2;
    }
    
    @Override
    public double calcularPerimetro() {
        return lado1 + lado2 + lado3;
    }
}

// Demostración de polimorfismo
class Main {
    public static void main(String[] args) {
        // Polimorfismo: misma referencia, diferentes objetos
        Figura[] figuras = {
            new Circulo("rojo", 5.0),
            new Rectangulo("azul", 4.0, 6.0),
            new Triangulo("verde", 3.0, 4.0, 3.0, 4.0, 5.0)
        };
        
        // Procesar diferentes figuras de manera uniforme
        for (Figura figura : figuras) {
            System.out.println("\\n--- " + figura.getClass().getSimpleName() + " ---");
            System.out.println("Color: " + figura.getColor());
            System.out.println("Área: " + String.format("%.2f", figura.calcularArea()));
            System.out.println("Perímetro: " + String.format("%.2f", figura.calcularPerimetro()));
            figura.pintar();
        }
        
        // Polimorfismo en métodos
        procesarFigura(new Circulo("amarillo", 3.0));
        procesarFigura(new Rectangulo("naranja", 2.0, 5.0));
    }
    
    // Método que trabaja con cualquier tipo de Figura
    public static void procesarFigura(Figura figura) {
        System.out.println("\\nProcesando figura de color " + figura.getColor());
        double area = figura.calcularArea();
        System.out.println("Área calculada: " + area);
        
        if (area > 20) {
            System.out.println("Es una figura grande");
        } else {
            System.out.println("Es una figura pequeña");
        }
    }
}`,
      explanation: "El polimorfismo permite que objetos de diferentes clases sean tratados como objetos de una clase común. Las clases abstractas no pueden ser instanciadas directamente y pueden contener métodos abstractos que deben ser implementados por las subclases. Esto permite escribir código más flexible y reutilizable, ya que puedes trabajar con la interfaz común sin preocuparte por los detalles específicos de cada subclase."
    },
    {
      title: "Encapsulamiento y Modificadores de Acceso",
      description: "Controla el acceso a los datos y métodos",
      code: `// Encapsulamiento y modificadores de acceso

public class CuentaBancaria {
    // Atributos privados (solo accesibles dentro de la clase)
    private String numeroCuenta;
    private double saldo;
    private String titular;
    
    // Atributo protegido (accesible en subclases)
    protected String tipoCuenta;
    
    // Atributo de paquete (accesible en el mismo paquete)
    String banco;
    
    // Constructor público
    public CuentaBancaria(String numeroCuenta, String titular, double saldoInicial) {
        this.numeroCuenta = numeroCuenta;
        this.titular = titular;
        this.saldo = saldoInicial;
        this.tipoCuenta = "Ahorros";
        this.banco = "Banco Central";
    }
    
    // Métodos públicos (accesibles desde cualquier lugar)
    public double getSaldo() {
        return saldo;
    }
    
    public String getTitular() {
        return titular;
    }
    
    public String getNumeroCuenta() {
        return numeroCuenta;
    }
    
    // Métodos con validación
    public boolean depositar(double cantidad) {
        if (cantidad > 0) {
            saldo += cantidad;
            registrarTransaccion("Depósito", cantidad);
            return true;
        }
        return false;
    }
    
    public boolean retirar(double cantidad) {
        if (cantidad > 0 && cantidad <= saldo) {
            saldo -= cantidad;
            registrarTransaccion("Retiro", cantidad);
            return true;
        }
        return false;
    }
    
    // Método privado (solo accesible dentro de la clase)
    private void registrarTransaccion(String tipo, double cantidad) {
        System.out.println("Transacción registrada: " + tipo + " de $" + cantidad);
        // Aquí podría haber lógica para guardar en un log o base de datos
    }
    
    // Método protegido (accesible en subclases)
    protected void actualizarTipoCuenta(String nuevoTipo) {
        this.tipoCuenta = nuevoTipo;
    }
    
    // Método de paquete (accesible en el mismo paquete)
    void mostrarInformacionInterna() {
        System.out.println("Información interna del banco");
    }
    
    @Override
    public String toString() {
        return String.format("Cuenta[%s, Titular: %s, Saldo: $%.2f]", 
                           numeroCuenta, titular, saldo);
    }
}

// Subclase que accede a miembros protegidos
public class CuentaPremium extends CuentaBancaria {
    private double limiteCredito;
    
    public CuentaPremium(String numeroCuenta, String titular, double saldoInicial, double limiteCredito) {
        super(numeroCuenta, titular, saldoInicial);
        this.limiteCredito = limiteCredito;
        this.tipoCuenta = "Premium"; // Acceso a atributo protegido
    }
    
    public boolean retirarConCredito(double cantidad) {
        if (cantidad > 0 && cantidad <= (saldo + limiteCredito)) {
            saldo -= cantidad;
            registrarTransaccion("Retiro con crédito", cantidad); // Error: método privado
            return true;
        }
        return false;
    }
    
    public void actualizarCuenta() {
        actualizarTipoCuenta("Premium Plus"); // Acceso a método protegido
    }
}

// Uso del encapsulamiento
class Main {
    public static void main(String[] args) {
        CuentaBancaria cuenta = new CuentaBancaria("12345", "Juan Pérez", 1000.0);
        
        // Acceso correcto a través de métodos públicos
        System.out.println("Saldo inicial: $" + cuenta.getSaldo());
        cuenta.depositar(500.0);
        System.out.println("Saldo después del depósito: $" + cuenta.getSaldo());
        
        // Intento de acceso directo a atributos privados (error de compilación)
        // cuenta.saldo = 5000.0; // ERROR: saldo es privado
        
        // Acceso controlado
        boolean exito = cuenta.retirar(200.0);
        if (exito) {
            System.out.println("Retiro exitoso");
        } else {
            System.out.println("Retiro fallido");
        }
        
        System.out.println(cuenta.toString());
    }
}`,
      explanation: "El encapsulamiento es el principio de ocultar los datos internos de una clase y exponer solo lo necesario a través de métodos públicos. Los modificadores de acceso controlan la visibilidad: 'private' (solo la clase), 'protected' (clase y subclases), 'public' (todas partes), y sin modificador (mismo paquete). Esto protege los datos y permite validación y control sobre cómo se modifican."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Programación Orientada a Objetos</h1>
        <p className="text-lg text-gray-600 mb-6">
          Los pilares de la POO: encapsulamiento, herencia y polimorfismo.
        </p>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-indigo-700">
                <strong>Concepto clave:</strong> La POO organiza el código en objetos que tienen 
                datos (atributos) y comportamientos (métodos), haciendo el código más modular, 
                reutilizable y fácil de mantener.
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

      <div className="mt-8 bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700">
              <strong>Proyecto práctico:</strong> Crea un sistema de gestión de biblioteca con 
              clases Libro, Autor, Usuario y Biblioteca. Implementa herencia entre diferentes 
              tipos de usuarios (Estudiante, Profesor) y usa polimorfismo para préstamos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectOrientedProgramming;
