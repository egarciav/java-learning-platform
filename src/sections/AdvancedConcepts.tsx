import React from 'react';
import CodeExample from '../components/CodeExample';

const AdvancedConcepts: React.FC = () => {
  const examples = [
    {
      title: "Interfaces",
      description: "Define contratos que las clases deben implementar",
      code: `// Interfaces en Java

// Interface básica
interface Volador {
    // Métodos abstractos (sin implementación)
    void volar();
    double getAltitudMaxima();
    
    // Constantes (siempre public static final)
    double ALTURA_MAXIMA_DEFECTO = 10000.0;
    
    // Métodos default (Java 8+)
    default void despegar() {
        System.out.println("Iniciando secuencia de despegue...");
        volar();
    }
    
    // Métodos static (Java 8+)
    static void mostrarInfo() {
        System.out.println("Esta interfaz define capacidades de vuelo");
    }
}

// Interface que hereda de otra interfaz
interface VoladorDeAltaVelocidad extends Volador {
    void volarSupersonico();
    double getVelocidadMaxima();
}

// Clases que implementan interfaces
class Pajaro implements Volador {
    private String especie;
    private double altitudMaxima;
    
    public Pajaro(String especie, double altitudMaxima) {
        this.especie = especie;
        this.altitudMaxima = altitudMaxima;
    }
    
    @Override
    public void volar() {
        System.out.println(especie + " está volando con sus alas");
    }
    
    @Override
    public double getAltitudMaxima() {
        return altitudMaxima;
    }
    
    // Puede sobrescribir el método default
    @Override
    public void despegar() {
        System.out.println(especie + " corre y salta para volar");
        volar();
    }
}

class Avion implements VoladorDeAltaVelocidad {
    private String modelo;
    private double altitudMaxima;
    private double velocidadMaxima;
    
    public Avion(String modelo, double altitudMaxima, double velocidadMaxima) {
        this.modelo = modelo;
        this.altitudMaxima = altitudMaxima;
        this.velocidadMaxima = velocidadMaxima;
    }
    
    @Override
    public void volar() {
        System.out.println(modelo + " está volando con motores");
    }
    
    @Override
    public double getAltitudMaxima() {
        return altitudMaxima;
    }
    
    @Override
    public void volarSupersonico() {
        System.out.println(modelo + " rompiendo la barrera del sonido");
    }
    
    @Override
    public double getVelocidadMaxima() {
        return velocidadMaxima;
    }
}

// Implementación múltiple de interfaces
interface Nadador {
    void nadar();
    double getProfundidadMaxima();
}

interface Corredor {
    void correr();
    double getVelocidadTerrestre();
}

class Pato implements Volador, Nadador {
    private String nombre;
    
    public Pato(String nombre) {
        this.nombre = nombre;
    }
    
    @Override
    public void volar() {
        System.out.println(nombre + " vuela distancias cortas");
    }
    
    @Override
    public double getAltitudMaxima() {
        return 1000.0;
    }
    
    @Override
    public void nadar() {
        System.out.println(nombre + " nada elegantemente");
    }
    
    @Override
    public double getProfundidadMaxima() {
        return 5.0;
    }
}

// Uso de interfaces
public class InterfaceDemo {
    public static void main(String[] args) {
        // Polimorfismo con interfaces
        Volador[] voladores = {
            new Pajaro("Águila", 8000.0),
            new Avion("Boeing 747", 13000.0, 920.0),
            new Pato("Donald")
        };
        
        for (Volador volador : voladores) {
            System.out.println("\\n--- " + volador.getClass().getSimpleName() + " ---");
            volador.despegar();
            System.out.println("Altitud máxima: " + volador.getAltitudMaxima() + " metros");
            
            // Verificar si implementa otra interfaz
            if (volador instanceof VoladorDeAltaVelocidad) {
                VoladorDeAltaVelocidad avionRapido = (VoladorDeAltaVelocidad) volador;
                avionRapido.volarSupersonico();
                System.out.println("Velocidad máxima: " + avionRapido.getVelocidadMaxima() + " km/h");
            }
            
            if (volador instanceof Nadador) {
                Nadador nadador = (Nadador) volador;
                nadador.nadar();
            }
        }
        
        // Usar métodos estáticos de la interfaz
        Volador.mostrarInfo();
    }
}`,
      explanation: "Las interfaces definen contratos que las clases deben cumplir. Contienen métodos abstractos (sin implementación), constantes, y desde Java 8+ pueden tener métodos default y static. Las clases pueden implementar múltiples interfaces, lo que permite una forma de herencia múltiple segura. Las interfaces son fundamentales para el polimorfismo y para definir APIs claras y desacopladas."
    },
    {
      title: "Clases Abstractas",
      description: "Clases base que no pueden ser instanciadas directamente",
      code: `// Clases abstractas en Java

// Clase abstracta base
abstract public class Animal {
    protected String nombre;
    protected int edad;
    protected String especie;
    
    // Constructor (puede ser llamado por subclases)
    public Animal(String nombre, int edad, String especie) {
        this.nombre = nombre;
        this.edad = edad;
        this.especie = especie;
    }
    
    // Métodos concretos (compartidos por todas las subclases)
    public void dormir() {
        System.out.println(nombre + " está durmiendo");
    }
    
    public void comer() {
        System.out.println(nombre + " está comiendo");
    }
    
    // Métodos abstractos (deben ser implementados por subclases)
    public abstract void hacerSonido();
    public abstract void moverse();
    
    // Método abstracto con parámetros
    public abstract String obtenerInformacion();
    
    // Método concreto que usa métodos abstractos (Template Method Pattern)
    public void rutinaDiaria() {
        System.out.println("\\n--- Rutina diaria de " + nombre + " ---");
        despertar();
        comer();
        moverse();
        hacerSonido();
        comer();
        dormir();
    }
    
    private void despertar() {
        System.out.println(nombre + " se está despertando");
    }
    
    // Getters y setters
    public String getNombre() {
        return nombre;
    }
    
    public int getEdad() {
        return edad;
    }
    
    public void setEdad(int edad) {
        this.edad = edad;
    }
    
    public String getEspecie() {
        return especie;
    }
}

// Subclases concretas
class Perro extends Animal {
    private String raza;
    
    public Perro(String nombre, int edad, String raza) {
        super(nombre, edad, "Perro");
        this.raza = raza;
    }
    
    @Override
    public void hacerSonido() {
        System.out.println(nombre + " dice: ¡Guau! ¡Guau!");
    }
    
    @Override
    public void moverse() {
        System.out.println(nombre + " corre y juega");
    }
    
    @Override
    public String obtenerInformacion() {
        return String.format("Perro[nombre=%s, edad=%d, raza=%s]", nombre, edad, raza);
    }
    
    // Método específico de Perro
    public void ladrar() {
        System.out.println(nombre + " está ladrando fuerte");
    }
    
    public String getRaza() {
        return raza;
    }
}

class Gato extends Animal {
    private boolean esDomestico;
    
    public Gato(String nombre, int edad, boolean esDomestico) {
        super(nombre, edad, "Gato");
        this.esDomestico = esDomestico;
    }
    
    @Override
    public void hacerSonido() {
        System.out.println(nombre + " dice: Miau");
    }
    
    @Override
    public void moverse() {
        System.out.println(nombre + " se mueve sigilosamente");
    }
    
    @Override
    public String obtenerInformacion() {
        return String.format("Gato[nombre=%s, edad=%d, domestico=%s]", 
                           nombre, edad, esDomestico);
    }
    
    // Sobrescribir método concreto
    @Override
    public void dormir() {
        System.out.println(nombre + " duerme en lugares cómodos y soleados");
    }
    
    public boolean esDomestico() {
        return esDomestico;
    }
}

// Clase abstracta que hereda de otra abstracta
abstract public class Ave extends Animal {
    protected double envergaduraAlas;
    
    public Ave(String nombre, int edad, double envergaduraAlas) {
        super(nombre, edad, "Ave");
        this.envergaduraAlas = envergaduraAlas;
    }
    
    // Método abstracto adicional
    public abstract void volar();
    
    // Sobrescribir método abstracto de la superclase
    @Override
    public abstract void hacerSonido();
    
    // Método concreto específico de aves
    public void construirNido() {
        System.out.println(nombre + " está construyendo un nido");
    }
}

class Aguila extends Ave {
    private double velocidadVuelo;
    
    public Aguila(String nombre, int edad, double envergaduraAlas, double velocidadVuelo) {
        super(nombre, edad, envergaduraAlas);
        this.velocidadVuelo = velocidadVuelo;
    }
    
    @Override
    public void hacerSonido() {
        System.out.println(nombre + " emite un grito agudo");
    }
    
    @Override
    public void moverse() {
        volar(); // Las águilas se mueven principalmente volando
    }
    
    @Override
    public void volar() {
        System.out.println(nombre + " vuela a gran altura");
    }
    
    @Override
    public String obtenerInformacion() {
        return String.format("Águila[nombre=%s, edad=%d, envergadura=%.1f, velocidad=%.1f]", 
                           nombre, edad, envergaduraAlas, velocidadVuelo);
    }
}

// Uso de clases abstractas
public class ClaseAbstractaDemo {
    public static void main(String[] args) {
        // No se puede instanciar una clase abstracta
        // Animal animal = new Animal("Genérico", 5, "Desconocida"); // ERROR
        
        // Pero sí se pueden usar referencias a la clase abstracta
        Animal[] animales = {
            new Perro("Fido", 3, "Labrador"),
            new Gato("Michi", 2, true),
            new Aguila("Águila Real", 5, 2.2, 320.0)
        };
        
        for (Animal animal : animales) {
            System.out.println("\\n" + animal.obtenerInformacion());
            animal.rutinaDiaria();
            
            // Verificar tipo específico
            if (animal instanceof Perro) {
                Perro perro = (Perro) animal;
                perro.ladrar();
                System.out.println("Raza: " + perro.getRaza());
            } else if (animal instanceof Aguila) {
                Aguila aguila = (Aguila) animal;
                aguila.construirNido();
            }
        }
    }
}`,
      explanation: "Las clases abstractas no pueden ser instanciadas directamente y pueden contener métodos abstractos (sin implementación) y métodos concretos (con implementación). Sirven como plantillas para subclases que deben implementar los métodos abstractos. A diferencia de las interfaces, pueden tener estado (atributos) y constructores. Son útiles cuando quieres compartir código entre clases relacionadas pero forzar ciertos comportamientos."
    },
    {
      title: "Generics (Tipos Genéricos)",
      description: "Crea clases y métodos que trabajan con diferentes tipos de datos",
      code: `// Generics en Java

// Clase genérica simple
class Caja<T> {
    private T contenido;
    
    public void guardar(T contenido) {
        this.contenido = contenido;
    }
    
    public T obtener() {
        return contenido;
    }
    
    public boolean estaVacia() {
        return contenido == null;
    }
    
    @Override
    public String toString() {
        return "Caja{contenido=" + contenido + "}";
    }
}

// Clase genérica con múltiples parámetros
class Par<K, V> {
    private K clave;
    private V valor;
    
    public Par(K clave, V valor) {
        this.clave = clave;
        this.valor = valor;
    }
    
    public K getClave() {
        return clave;
    }
    
    public V getValor() {
        return valor;
    }
    
    public void setValor(V valor) {
        this.valor = valor;
    }
    
    @Override
    public String toString() {
        return "Par{" + clave + "=" + valor + "}";
    }
}

// Clase genérica con tipo acotado (bounded)
class Numero<T extends Number> {
    private T valor;
    
    public Numero(T valor) {
        this.valor = valor;
    }
    
    public T getValor() {
        return valor;
    }
    
    // Método que usa métodos de Number
    public double doubleValue() {
        return valor.doubleValue();
    }
    
    public int intValue() {
        return valor.intValue();
    }
    
    // Método genérico estático
    public static <U extends Number> double sumar(U a, U b) {
        return a.doubleValue() + b.doubleValue();
    }
    
    @Override
    public String toString() {
        return "Numero{valor=" + valor + "}";
    }
}

// Clase con wildcard
class Utilidades {
    // Método con wildcard no acotado
    public static void imprimirLista(java.util.List<?> lista) {
        System.out.println("Lista: " + lista);
    }
    
    // Método con wildcard acotado superior
    public static double sumarNumeros(java.util.List<? extends Number> numeros) {
        double suma = 0.0;
        for (Number num : numeros) {
            suma += num.doubleValue();
        }
        return suma;
    }
    
    // Método con wildcard acotado inferior
    public static void agregarNumeros(java.util.List<? super Integer> lista) {
        lista.add(10);
        lista.add(20);
        lista.add(30);
    }
}

// Clase genérica propia con métodos genéricos
class Contenedor<T> {
    private java.util.List<T> elementos = new java.util.ArrayList<>();
    
    public void agregar(T elemento) {
        elementos.add(elemento);
    }
    
    public T obtener(int indice) {
        return elementos.get(indice);
    }
    
    public int tamaño() {
        return elementos.size();
    }
    
    // Método genérico
    public <U> boolean contiene(U elemento) {
        return elementos.contains(elemento);
    }
    
    // Método con tipo genérico acotado
    public <U extends T> void agregarSiNoExiste(U elemento) {
        if (!elementos.contains(elemento)) {
            elementos.add(elemento);
        }
    }
    
    // Método que retorna tipo genérico
    public T[] toArray(T[] array) {
        return elementos.toArray(array);
    }
    
    @Override
    public String toString() {
        return "Contenedor" + elementos;
    }
}

// Uso de generics
public class GenericsDemo {
    public static void main(String[] args) {
        // Uso de clase genérica simple
        Caja<String> cajaString = new Caja<>();
        cajaString.guardar("Hola Mundo");
        System.out.println("Caja de String: " + cajaString.obtener());
        
        Caja<Integer> cajaInteger = new Caja<>();
        cajaInteger.guardar(42);
        System.out.println("Caja de Integer: " + cajaInteger.obtener());
        
        Caja<Boolean> cajaBoolean = new Caja<>();
        cajaBoolean.guardar(true);
        System.out.println("Caja de Boolean: " + cajaBoolean.obtener());
        
        // Uso de clase con múltiples parámetros
        Par<String, Integer> par1 = new Par<>("Edad", 25);
        Par<Integer, String> par2 = new Par<>(1, "Primero");
        
        System.out.println("Par 1: " + par1);
        System.out.println("Par 2: " + par2);
        
        // Uso de clase con tipo acotado
        Numero<Integer> numInt = new Numero<>(100);
        Numero<Double> numDouble = new Numero<>(3.14);
        
        System.out.println("Número entero: " + numInt + ", double: " + numInt.doubleValue());
        System.out.println("Número decimal: " + numDouble + ", int: " + numDouble.intValue());
        
        // Uso de método genérico estático
        double suma = Numero.sumar(10, 20.5);
        System.out.println("Suma genérica: " + suma);
        
        // Uso de contenedor genérico
        Contenedor<String> contenedorString = new Contenedor<>();
        contenedorString.agregar("Java");
        contenedorString.agregar("Python");
        contenedorString.agregar("JavaScript");
        
        System.out.println("Contenedor: " + contenedorString);
        System.out.println("¿Contiene 'Python'? " + contenedorString.contiene("Python"));
        
        // Uso de utilidades con wildcards
        java.util.List<Integer> enteros = java.util.Arrays.asList(1, 2, 3, 4, 5);
        java.util.List<Double> decimales = java.util.Arrays.asList(1.1, 2.2, 3.3);
        
        System.out.println("Lista de enteros: ");
        Utilidades.imprimirLista(enteros);
        
        double sumaEnteros = Utilidades.sumarNumeros(enteros);
        double sumaDecimales = Utilidades.sumarNumeros(decimales);
        
        System.out.println("Suma de enteros: " + sumaEnteros);
        System.out.println("Suma de decimales: " + sumaDecimales);
        
        // Ejemplo práctico: Pila genérica
        Pila<String> pilaString = new Pila<>();
        pilaString.push("A");
        pilaString.push("B");
        pilaString.push("C");
        
        System.out.println("\\n--- Pila de Strings ---");
        while (!pilaString.estaVacia()) {
            System.out.println("Pop: " + pilaString.pop());
        }
        
        Pila<Integer> pilaInteger = new Pila<>();
        pilaInteger.push(1);
        pilaInteger.push(2);
        pilaInteger.push(3);
        
        System.out.println("\\n--- Pila de Integers ---");
        while (!pilaInteger.estaVacia()) {
            System.out.println("Pop: " + pilaInteger.pop());
        }
    }
}

// Clase Pila genérica
class Pila<T> {
    private java.util.List<T> elementos = new java.util.ArrayList<>();
    
    public void push(T elemento) {
        elementos.add(elemento);
    }
    
    public T pop() {
        if (estaVacia()) {
            throw new java.util.EmptyStackException();
        }
        return elementos.remove(elementos.size() - 1);
    }
    
    public T peek() {
        if (estaVacia()) {
            throw new java.util.EmptyStackException();
        }
        return elementos.get(elementos.size() - 1);
    }
    
    public boolean estaVacia() {
        return elementos.isEmpty();
    }
    
    public int tamaño() {
        return elementos.size();
    }
}`,
      explanation: "Los generics permiten crear clases y métodos que trabajan con diferentes tipos de datos manteniendo la seguridad de tipos en tiempo de compilación. Usan parámetros de tipo como <T>. Los tipos acotados (bounded) restringen los tipos permitidos usando extends. Los wildcards (?) permiten mayor flexibilidad. Los generics eliminan la necesidad de casting y proporcionan seguridad tipográfica, siendo fundamentales en el framework Collections de Java."
    },
    {
      title: "Enums (Tipos Enumerados)",
      description: "Define conjuntos fijos de constantes con comportamiento",
      code: `// Enums en Java

// Enum básico
enum DiaSemana {
    LUNES, MARTES, MIÉRCOLES, JUEVES, VIERNES, SÁBADO, DOMINGO
}

// Enum con constructores y métodos
enum NivelPrioridad {
    BAJO(1, "Baja prioridad"),
    MEDIO(2, "Prioridad media"),
    ALTO(3, "Alta prioridad"),
    CRÍTICO(4, "Prioridad crítica");
    
    private final int nivel;
    private final String descripcion;
    
    // Constructor (siempre private)
    NivelPrioridad(int nivel, String descripcion) {
        this.nivel = nivel;
        this.descripcion = descripcion;
    }
    
    public int getNivel() {
        return nivel;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    // Método estático
    public static NivelPrioridad fromNivel(int nivel) {
        for (NivelPrioridad prioridad : values()) {
            if (prioridad.getNivel() == nivel) {
                return prioridad;
            }
        }
        throw new IllegalArgumentException("Nivel no válido: " + nivel);
    }
    
    @Override
    public String toString() {
        return descripcion;
    }
}

// Enum con métodos abstractos
enum OperacionMatematica {
    SUMAR {
        @Override
        public double aplicar(double a, double b) {
            return a + b;
        }
        
        @Override
        public String getSimbolo() {
            return "+";
        }
    },
    
    RESTAR {
        @Override
        public double aplicar(double a, double b) {
            return a - b;
        }
        
        @Override
        public String getSimbolo() {
            return "-";
        }
    },
    
    MULTIPLICAR {
        @Override
        public double aplicar(double a, double b) {
            return a * b;
        }
        
        @Override
        public String getSimbolo() {
            return "*";
        }
    },
    
    DIVIDIR {
        @Override
        public double aplicar(double a, double b) {
            if (b == 0) {
                throw new ArithmeticException("División por cero");
            }
            return a / b;
        }
        
        @Override
        public String getSimbolo() {
            return "/";
        }
    };
    
    // Método abstracto que cada constante debe implementar
    public abstract double aplicar(double a, double b);
    public abstract String getSimbolo();
}

// Enum que implementa una interfaz
interface Descriptible {
    String getDescripcion();
    String getCategoria();
}

enum EstadoCivil implements Descriptible {
    SOLTERO("No casado", "Estado personal"),
    CASADO("Unido legalmente", "Estado personal"),
    DIVORCIADO("Separado legalmente", "Estado personal"),
    VIUDO("Cónyuge fallecido", "Estado personal");
    
    private final String descripcion;
    private final String categoria;
    
    EstadoCivil(String descripcion, String categoria) {
        this.descripcion = descripcion;
        this.categoria = categoria;
    }
    
    @Override
    public String getDescripcion() {
        return descripcion;
    }
    
    @Override
    public String getCategoria() {
        return categoria;
    }
}

// Enum con atributos y comportamiento complejo
enum Planeta {
    MERCURIO(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    TIERRA(5.976e+24, 6.37814e6),
    MARTE(6.421e+23, 3.3972e6),
    JÚPITER(1.9e+27, 7.1492e7),
    SATURNO(5.688e+26, 6.0268e7),
    URANO(8.686e+25, 2.5559e7),
    NEPTUNO(1.024e+26, 2.4746e7);
    
    private final double masa; // en kilogramos
    private final double radio; // en metros
    
    Planeta(double masa, double radio) {
        this.masa = masa;
        this.radio = radio;
    }
    
    public double getMasa() {
        return masa;
    }
    
    public double getRadio() {
        return radio;
    }
    
    // Constante universal
    private static final double G = 6.67300E-11; // constante gravitacional universal
    
    public double pesoSuperficial(double masaHumana) {
        return masaHumana * G * masa / (radio * radio);
    }
    
    @Override
    public String toString() {
        return name() + " [masa=" + masa + ", radio=" + radio + "]";
    }
}

// Clase que usa enums
class Tarea {
    private String nombre;
    private NivelPrioridad prioridad;
    private DiaSemana diaLimite;
    
    public Tarea(String nombre, NivelPrioridad prioridad, DiaSemana diaLimite) {
        this.nombre = nombre;
        this.prioridad = prioridad;
        this.diaLimite = diaLimite;
    }
    
    public void mostrarInformacion() {
        System.out.println("Tarea: " + nombre);
        System.out.println("Prioridad: " + prioridad.getDescripcion() + 
                          " (Nivel " + prioridad.getNivel() + ")");
        System.out.println("Día límite: " + diaLimite);
    }
    
    public boolean esUrgente() {
        return prioridad == NivelPrioridad.ALTO || prioridad == NivelPrioridad.CRÍTICO;
    }
    
    // Getters y setters
    public String getNombre() {
        return nombre;
    }
    
    public NivelPrioridad getPrioridad() {
        return prioridad;
    }
    
    public void setPrioridad(NivelPrioridad prioridad) {
        this.prioridad = prioridad;
    }
    
    public DiaSemana getDiaLimite() {
        return diaLimite;
    }
}

// Uso de enums
public class EnumDemo {
    public static void main(String[] args) {
        // Uso de enum básico
        System.out.println("=== Días de la semana ===");
        DiaSemana hoy = DiaSemana.MIÉRCOLES;
        System.out.println("Hoy es: " + hoy);
        System.out.println("Posición ordinal: " + hoy.ordinal());
        
        // Iterar sobre todos los valores
        System.out.println("\\nTodos los días:");
        for (DiaSemana dia : DiaSemana.values()) {
            System.out.println(dia + " (ordinal: " + dia.ordinal() + ")");
        }
        
        // Comparación de enums
        DiaSemana otroDia = DiaSemana.LUNES;
        if (hoy == otroDia) {
            System.out.println("Son el mismo día");
        } else {
            System.out.println("Son días diferentes");
        }
        
        // Uso de enum con constructores y métodos
        System.out.println("\\n=== Niveles de prioridad ===");
        NivelPrioridad prioridad = NivelPrioridad.ALTO;
        System.out.println("Prioridad: " + prioridad);
        System.out.println("Nivel: " + prioridad.getNivel());
        System.out.println("Descripción: " + prioridad.getDescripcion());
        
        // Usar método estático
        NivelPrioridad desdeNivel = NivelPrioridad.fromNivel(3);
        System.out.println("Desde nivel 3: " + desdeNivel);
        
        // Uso de enum con métodos abstractos
        System.out.println("\\n=== Operaciones matemáticas ===");
        double a = 10.0, b = 5.0;
        
        for (OperacionMatematica op : OperacionMatematica.values()) {
            try {
                double resultado = op.aplicar(a, b);
                System.out.printf("%.1f %s %.1f = %.1f\\n", a, op.getSimbolo(), b, resultado);
            } catch (ArithmeticException e) {
                System.out.printf("Error en %s: %s\\n", op.getSimbolo(), e.getMessage());
            }
        }
        
        // Uso de enum que implementa interfaz
        System.out.println("\\n=== Estados civiles ===");
        for (EstadoCivil estado : EstadoCivil.values()) {
            System.out.printf("%s: %s (%s)\\n", 
                             estado, estado.getDescripcion(), estado.getCategoria());
        }
        
        // Uso de enum complejo (Planeta)
        System.out.println("\\n=== Pesos en diferentes planetas ===");
        double masaHumana = 70; // kg
        
        for (Planeta planeta : Planeta.values()) {
            double peso = planeta.pesoSuperficial(masaHumana);
            System.out.printf("Tu peso en %s es %.2f N\\n", planeta, peso);
        }
        
        // Uso en clase Tarea
        System.out.println("\\n=== Sistema de tareas ===");
        Tarea tarea1 = new Tarea("Terminar proyecto", NivelPrioridad.CRÍTICO, DiaSemana.VIERNES);
        Tarea tarea2 = new Tarea("Revisar correo", NivelPrioridad.BAJO, DiaSemana.LUNES);
        
        tarea1.mostrarInformacion();
        System.out.println("¿Es urgente? " + tarea1.esUrgente());
        
        System.out.println();
        tarea2.mostrarInformacion();
        System.out.println("¿Es urgente? " + tarea2.esUrgente());
        
        // Switch con enums
        System.out.println("\\n=== Switch con enums ===");
        DiaSemana dia = DiaSemana.SÁBADO;
        String mensaje;
        
        switch (dia) {
            case LUNES:
            case MARTES:
            case MIÉRCOLES:
            case JUEVES:
            case VIERNES:
                mensaje = "Día laboral";
                break;
            case SÁBADO:
            case DOMINGO:
                mensaje = "Fin de semana";
                break;
            default:
                mensaje = "Día no reconocido";
        }
        
        System.out.println(dia + ": " + mensaje);
    }
}`,
      explanation: "Los enums son tipos especiales de clases que definen conjuntos fijos de constantes. Pueden tener constructores, atributos, métodos, e incluso implementar interfaces. Cada constante es una instancia del enum. Los enums proporcionan seguridad tipográfica frente a usar constantes String o int, y permiten comportamiento asociado a cada constante. Son ideales para representar conjuntos fijos de valores como días, estados, colores, etc."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Conceptos Intermedios de Java</h1>
        <p className="text-lg text-gray-600 mb-6">
          Tópicos avanzados que te prepararán para desarrollo empresarial y Spring Boot.
        </p>
        
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-purple-700">
                <strong>Preparación para Spring Boot:</strong> Estos conceptos son fundamentales 
                para entender cómo funciona Spring Boot. Las interfaces, generics y enums son 
                ampliamente utilizados en el framework.
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

      <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-indigo-700">
              <strong>Proyecto final:</strong> Crea un sistema de gestión de empleados que use 
              interfaces para diferentes tipos de empleados, generics para colecciones tipadas, 
              enums para departamentos y niveles, y clases abstractas para la jerarquía de empleados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedConcepts;
