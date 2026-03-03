import React from 'react';
import CodeExample from '../components/CodeExample';

const BasicConceptsExpanded: React.FC = () => {
  const examples = [
    {
      title: "Tipos de Datos Primitivos - Profundización Completa",
      description: "Todos los tipos primitivos en Java con sus rangos, tamaños y casos de uso",
      code: `// TIPOS PRIMITIVOS EN JAVA - GUÍA COMPLETA

public class TiposPrimitivos {
    public static void main(String[] args) {
        
        // ========== TIPOS ENTEROS ==========
        
        // byte: 8 bits, rango de -128 a 127
        byte edad = 25;
        byte temperatura = -10;
        System.out.println("byte - Tamaño: " + Byte.BYTES + " bytes");
        System.out.println("byte - Rango: " + Byte.MIN_VALUE + " a " + Byte.MAX_VALUE);
        
        // short: 16 bits, rango de -32,768 a 32,767
        short poblacion = 15000;
        System.out.println("\\nshort - Tamaño: " + Short.BYTES + " bytes");
        System.out.println("short - Rango: " + Short.MIN_VALUE + " a " + Short.MAX_VALUE);
        
        // int: 32 bits, rango de -2,147,483,648 a 2,147,483,647
        int habitantes = 1000000;
        int negativo = -500;
        System.out.println("\\nint - Tamaño: " + Integer.BYTES + " bytes");
        System.out.println("int - Rango: " + Integer.MIN_VALUE + " a " + Integer.MAX_VALUE);
        
        // long: 64 bits, rango muy grande
        long distanciaEstrella = 9460730472580800L; // Nota la 'L' al final
        long poblacionMundial = 7800000000L;
        System.out.println("\\nlong - Tamaño: " + Long.BYTES + " bytes");
        System.out.println("long - Rango: " + Long.MIN_VALUE + " a " + Long.MAX_VALUE);
        
        // ========== TIPOS DE PUNTO FLOTANTE ==========
        
        // float: 32 bits, precisión de ~6-7 dígitos decimales
        float precio = 19.99f; // Nota la 'f' al final
        float pi = 3.14159f;
        System.out.println("\\nfloat - Tamaño: " + Float.BYTES + " bytes");
        System.out.println("float - Rango: " + Float.MIN_VALUE + " a " + Float.MAX_VALUE);
        
        // double: 64 bits, precisión de ~15-16 dígitos decimales
        double precisionAlta = 3.141592653589793;
        double distancia = 384400.0; // km a la Luna
        System.out.println("\\ndouble - Tamaño: " + Double.BYTES + " bytes");
        System.out.println("double - Rango: " + Double.MIN_VALUE + " a " + Double.MAX_VALUE);
        
        // ========== TIPO CARÁCTER ==========
        
        // char: 16 bits, representa un carácter Unicode
        char letra = 'A';
        char simbolo = '@';
        char unicode = '\\u0041'; // 'A' en Unicode
        char numero = '5'; // Carácter, no número
        System.out.println("\\nchar - Tamaño: " + Character.BYTES + " bytes");
        System.out.println("char - Rango: " + (int)Character.MIN_VALUE + " a " + (int)Character.MAX_VALUE);
        
        // ========== TIPO BOOLEANO ==========
        
        // boolean: representa true o false
        boolean esVerdadero = true;
        boolean esFalso = false;
        boolean resultado = (5 > 3); // true
        System.out.println("\\nboolean - Valores: true o false");
        
        // ========== LITERALES NUMÉRICOS ==========
        
        // Diferentes formas de escribir números
        int decimal = 100;           // Decimal normal
        int binario = 0b1100100;     // Binario (prefijo 0b)
        int octal = 0144;            // Octal (prefijo 0)
        int hexadecimal = 0x64;      // Hexadecimal (prefijo 0x)
        
        System.out.println("\\nDiferentes representaciones del número 100:");
        System.out.println("Decimal: " + decimal);
        System.out.println("Binario: " + binario);
        System.out.println("Octal: " + octal);
        System.out.println("Hexadecimal: " + hexadecimal);
        
        // Guiones bajos para legibilidad (Java 7+)
        long tarjetaCredito = 1234_5678_9012_3456L;
        int millon = 1_000_000;
        
        // ========== VALORES ESPECIALES ==========
        
        // Infinito y NaN (Not a Number)
        double infinito = Double.POSITIVE_INFINITY;
        double negInfinito = Double.NEGATIVE_INFINITY;
        double noNumero = Double.NaN;
        
        System.out.println("\\nValores especiales:");
        System.out.println("Infinito positivo: " + infinito);
        System.out.println("Infinito negativo: " + negInfinito);
        System.out.println("NaN: " + noNumero);
        System.out.println("1.0 / 0.0 = " + (1.0 / 0.0)); // Infinito
        System.out.println("0.0 / 0.0 = " + (0.0 / 0.0)); // NaN
    }
}`,
      explanation: "Java tiene 8 tipos primitivos: byte (8 bits), short (16 bits), int (32 bits), long (64 bits) para enteros; float (32 bits) y double (64 bits) para decimales; char (16 bits) para caracteres Unicode; y boolean para valores lógicos. Cada tipo tiene un tamaño fijo en memoria y un rango específico. Los literales long requieren 'L' al final, los float requieren 'f'. Java soporta literales en binario (0b), octal (0), hexadecimal (0x) y permite guiones bajos para legibilidad. Los tipos de punto flotante tienen valores especiales como POSITIVE_INFINITY, NEGATIVE_INFINITY y NaN."
    },
    {
      title: "Tipos de Referencia y Wrappers",
      description: "Diferencia entre tipos primitivos y objetos wrapper",
      code: `// TIPOS DE REFERENCIA Y WRAPPER CLASSES

public class TiposReferencia {
    public static void main(String[] args) {
        
        // ========== TIPOS PRIMITIVOS VS WRAPPERS ==========
        
        // Primitivos (almacenan el valor directamente)
        int numeroPrimitivo = 42;
        double decimalPrimitivo = 3.14;
        boolean banderaPrimitiva = true;
        
        // Wrappers (objetos que envuelven primitivos)
        Integer numeroWrapper = 42;
        Double decimalWrapper = 3.14;
        Boolean banderaWrapper = true;
        
        // ========== AUTOBOXING Y UNBOXING ==========
        
        // Autoboxing: primitivo -> wrapper (automático)
        Integer autoBox = 100; // Equivale a: Integer.valueOf(100)
        
        // Unboxing: wrapper -> primitivo (automático)
        int autoUnbox = autoBox; // Equivale a: autoBox.intValue()
        
        System.out.println("Autoboxing: " + autoBox);
        System.out.println("Unboxing: " + autoUnbox);
        
        // ========== MÉTODOS ÚTILES DE WRAPPERS ==========
        
        // Conversión de String a número
        String textoNumero = "123";
        int numero = Integer.parseInt(textoNumero);
        double decimal = Double.parseDouble("45.67");
        boolean bandera = Boolean.parseBoolean("true");
        
        System.out.println("\\nConversiones desde String:");
        System.out.println("String a int: " + numero);
        System.out.println("String a double: " + decimal);
        System.out.println("String a boolean: " + bandera);
        
        // Conversión de número a String
        String texto1 = Integer.toString(42);
        String texto2 = String.valueOf(3.14);
        String texto3 = Double.toString(2.71);
        
        // Comparación de valores
        Integer a = 100;
        Integer b = 100;
        Integer c = 200;
        
        System.out.println("\\nComparación de Wrappers:");
        System.out.println("a.equals(b): " + a.equals(b)); // true
        System.out.println("a.compareTo(c): " + a.compareTo(c)); // negativo
        
        // Valores máximos y mínimos
        System.out.println("\\nValores límite:");
        System.out.println("Integer MAX: " + Integer.MAX_VALUE);
        System.out.println("Integer MIN: " + Integer.MIN_VALUE);
        System.out.println("Double MAX: " + Double.MAX_VALUE);
        System.out.println("Double MIN: " + Double.MIN_VALUE);
        
        // ========== CONVERSIONES ENTRE TIPOS ==========
        
        Integer entero = 42;
        
        // Wrapper a primitivos
        byte b1 = entero.byteValue();
        short s1 = entero.shortValue();
        int i1 = entero.intValue();
        long l1 = entero.longValue();
        float f1 = entero.floatValue();
        double d1 = entero.doubleValue();
        
        System.out.println("\\nConversiones desde Integer(42):");
        System.out.println("byte: " + b1);
        System.out.println("short: " + s1);
        System.out.println("int: " + i1);
        System.out.println("long: " + l1);
        System.out.println("float: " + f1);
        System.out.println("double: " + d1);
        
        // ========== CACHE DE WRAPPERS ==========
        
        // Java cachea valores pequeños (-128 a 127 para Integer)
        Integer x1 = 100;
        Integer x2 = 100;
        Integer y1 = 200;
        Integer y2 = 200;
        
        System.out.println("\\nCache de Wrappers:");
        System.out.println("x1 == x2 (100): " + (x1 == x2)); // true (mismo objeto)
        System.out.println("y1 == y2 (200): " + (y1 == y2)); // false (objetos diferentes)
        System.out.println("y1.equals(y2): " + y1.equals(y2)); // true (mismo valor)
        
        // ========== NULL EN WRAPPERS ==========
        
        Integer nulo = null;
        // int primitivoNulo = null; // ERROR: primitivos no pueden ser null
        
        System.out.println("\\nWrapper puede ser null: " + (nulo == null));
        
        // Cuidado con NullPointerException en unboxing
        try {
            int valor = nulo; // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("Error: No se puede hacer unboxing de null");
        }
        
        // ========== MÉTODOS ESTÁTICOS ÚTILES ==========
        
        // Conversión de bases
        String binario = Integer.toBinaryString(42);
        String octal = Integer.toOctalString(42);
        String hex = Integer.toHexString(42);
        
        System.out.println("\\nConversión de 42 a diferentes bases:");
        System.out.println("Binario: " + binario);
        System.out.println("Octal: " + octal);
        System.out.println("Hexadecimal: " + hex);
        
        // Parseo con base específica
        int desdeBinario = Integer.parseInt("101010", 2); // 42
        int desdeHex = Integer.parseInt("2A", 16); // 42
        
        System.out.println("Desde binario '101010': " + desdeBinario);
        System.out.println("Desde hex '2A': " + desdeHex);
        
        // Operaciones matemáticas
        System.out.println("\\nOperaciones con Integer:");
        System.out.println("max(10, 20): " + Integer.max(10, 20));
        System.out.println("min(10, 20): " + Integer.min(10, 20));
        System.out.println("sum(10, 20): " + Integer.sum(10, 20));
    }
}`,
      explanation: "Los wrapper classes (Integer, Double, Boolean, etc.) son versiones objeto de los tipos primitivos. Permiten usar primitivos donde se requieren objetos (colecciones, genéricos). El autoboxing convierte automáticamente primitivos a wrappers y viceversa. Los wrappers pueden ser null (primitivos no), tienen métodos útiles (parseInt, toString, compareTo), y Java cachea valores pequeños (-128 a 127) para eficiencia. Cuidado con NullPointerException al hacer unboxing de null. Los wrappers son inmutables y proporcionan constantes útiles (MAX_VALUE, MIN_VALUE)."
    },
    {
      title: "Variables: Declaración, Inicialización y Alcance",
      description: "Todo sobre variables, constantes y su alcance en Java",
      code: `// VARIABLES: DECLARACIÓN, INICIALIZACIÓN Y ALCANCE

public class Variables {
    
    // ========== VARIABLES DE INSTANCIA (ATRIBUTOS) ==========
    // Se declaran dentro de la clase pero fuera de métodos
    // Tienen valores por defecto si no se inicializan
    private int edad;              // default: 0
    private String nombre;         // default: null
    private boolean activo;        // default: false
    private double saldo;          // default: 0.0
    
    // ========== VARIABLES DE CLASE (ESTÁTICAS) ==========
    // Compartidas por todas las instancias de la clase
    private static int contador = 0;
    private static final String NOMBRE_EMPRESA = "MiEmpresa"; // Constante de clase
    
    // ========== CONSTANTES ==========
    // final: no puede cambiar después de inicialización
    public static final double PI = 3.141592653589793;
    public static final int DIAS_SEMANA = 7;
    private final String codigoUnico; // Constante de instancia
    
    // Constructor
    public Variables(String codigo) {
        this.codigoUnico = codigo; // Se inicializa una sola vez
        contador++; // Incrementa el contador estático
    }
    
    public void ejemploVariablesLocales() {
        // ========== VARIABLES LOCALES ==========
        // Se declaran dentro de métodos
        // DEBEN ser inicializadas antes de usarse
        int numero; // Declaración
        numero = 10; // Inicialización
        
        // Declaración e inicialización en una línea
        int suma = 5 + 3;
        String mensaje = "Hola";
        
        // Variables locales NO tienen valores por defecto
        int sinInicializar;
        // System.out.println(sinInicializar); // ERROR: variable no inicializada
        
        // ========== MÚLTIPLES DECLARACIONES ==========
        int a = 1, b = 2, c = 3; // Mismo tipo
        int x, y, z; // Declarar sin inicializar
        x = y = z = 0; // Inicializar todas a 0
        
        // ========== ALCANCE DE VARIABLES ==========
        {
            // Bloque interno
            int variableBloque = 100;
            System.out.println("Dentro del bloque: " + variableBloque);
            System.out.println("Acceso a variable local: " + numero);
        }
        // System.out.println(variableBloque); // ERROR: fuera de alcance
        
        // ========== SOMBREADO (SHADOWING) ==========
        int valor = 10; // Variable local
        
        if (true) {
            int valor2 = 20; // Diferente nombre, OK
            // int valor = 30; // ERROR: ya existe en este alcance
            System.out.println("Valor: " + valor);
        }
    }
    
    public void ejemploParametros(int parametro, String texto) {
        // ========== PARÁMETROS ==========
        // Los parámetros son variables locales del método
        // Se inicializan con los valores pasados al método
        
        System.out.println("Parámetro int: " + parametro);
        System.out.println("Parámetro String: " + texto);
        
        // Los parámetros pueden ser modificados (pero no afecta al original)
        parametro = parametro * 2;
        texto = texto.toUpperCase();
        
        System.out.println("Modificado int: " + parametro);
        System.out.println("Modificado String: " + texto);
    }
    
    public void ejemploVariablesFinal() {
        // ========== VARIABLES FINAL (CONSTANTES LOCALES) ==========
        final int MAXIMO = 100;
        // MAXIMO = 200; // ERROR: no se puede modificar
        
        final String PREFIJO;
        PREFIJO = "SR-"; // Se puede inicializar después de declarar
        // PREFIJO = "MR-"; // ERROR: ya fue inicializada
        
        // final en objetos: la referencia no cambia, pero el contenido sí
        final StringBuilder sb = new StringBuilder("Hola");
        sb.append(" Mundo"); // OK: modifica el contenido
        // sb = new StringBuilder(); // ERROR: no puede cambiar la referencia
        
        System.out.println("StringBuilder final: " + sb);
    }
    
    public static void main(String[] args) {
        // ========== DEMOSTRACIÓN DE ALCANCES ==========
        
        Variables obj1 = new Variables("ABC-001");
        Variables obj2 = new Variables("ABC-002");
        
        System.out.println("Contador (compartido): " + Variables.contador);
        System.out.println("Constante de clase: " + Variables.NOMBRE_EMPRESA);
        System.out.println("PI: " + Variables.PI);
        
        obj1.ejemploVariablesLocales();
        obj1.ejemploParametros(42, "java");
        obj1.ejemploVariablesFinal();
        
        // ========== CONVENCIONES DE NOMENCLATURA ==========
        System.out.println("\\n=== CONVENCIONES DE NOMENCLATURA ===");
        
        // Variables y métodos: camelCase
        int miVariable = 10;
        String nombreCompleto = "Juan Pérez";
        
        // Constantes: UPPER_SNAKE_CASE
        final int MAX_INTENTOS = 3;
        final double TASA_INTERES = 0.05;
        
        // Clases: PascalCase
        // class MiClase { }
        
        // Paquetes: lowercase
        // package com.miempresa.proyecto;
        
        System.out.println("Variables: camelCase");
        System.out.println("Constantes: UPPER_SNAKE_CASE");
        System.out.println("Clases: PascalCase");
        System.out.println("Paquetes: lowercase");
        
        // ========== VALORES POR DEFECTO ==========
        System.out.println("\\n=== VALORES POR DEFECTO (VARIABLES DE INSTANCIA) ===");
        Variables obj3 = new Variables("ABC-003");
        System.out.println("int no inicializado: " + obj3.edad);
        System.out.println("String no inicializado: " + obj3.nombre);
        System.out.println("boolean no inicializado: " + obj3.activo);
        System.out.println("double no inicializado: " + obj3.saldo);
    }
}`,
      explanation: "Las variables en Java tienen diferentes alcances: variables de instancia (atributos de objetos, tienen valores por defecto), variables de clase (static, compartidas por todas las instancias), variables locales (dentro de métodos, DEBEN inicializarse antes de usar), y parámetros (variables locales del método). Las constantes se declaran con 'final' y no pueden cambiar. El alcance determina dónde es visible una variable. Las convenciones de nomenclatura son: camelCase para variables/métodos, UPPER_SNAKE_CASE para constantes, PascalCase para clases. Las variables de instancia tienen valores por defecto (0, null, false), pero las locales no."
    },
    {
      title: "Operadores Completos - Todos los Tipos",
      description: "Guía exhaustiva de todos los operadores en Java",
      code: `// OPERADORES EN JAVA - GUÍA COMPLETA

public class OperadoresCompletos {
    public static void main(String[] args) {
        
        // ========== OPERADORES ARITMÉTICOS ==========
        System.out.println("=== OPERADORES ARITMÉTICOS ===");
        
        int a = 10, b = 3;
        
        System.out.println("a + b = " + (a + b));   // Suma: 13
        System.out.println("a - b = " + (a - b));   // Resta: 7
        System.out.println("a * b = " + (a * b));   // Multiplicación: 30
        System.out.println("a / b = " + (a / b));   // División entera: 3
        System.out.println("a % b = " + (a % b));   // Módulo (resto): 1
        
        // División con decimales
        double x = 10.0, y = 3.0;
        System.out.println("10.0 / 3.0 = " + (x / y)); // 3.333...
        
        // Cuidado con división por cero
        // int error = 10 / 0; // ArithmeticException
        double infinito = 10.0 / 0.0; // Infinity
        System.out.println("10.0 / 0.0 = " + infinito);
        
        // ========== OPERADORES UNARIOS ==========
        System.out.println("\\n=== OPERADORES UNARIOS ===");
        
        int num = 5;
        System.out.println("+num = " + (+num));    // Positivo: 5
        System.out.println("-num = " + (-num));    // Negativo: -5
        
        // Incremento y decremento
        int contador = 0;
        System.out.println("contador inicial: " + contador);
        System.out.println("contador++: " + (contador++)); // Post-incremento: 0, luego 1
        System.out.println("contador después: " + contador);
        System.out.println("++contador: " + (++contador)); // Pre-incremento: 2
        System.out.println("contador--: " + (contador--)); // Post-decremento: 2, luego 1
        System.out.println("--contador: " + (--contador)); // Pre-decremento: 0
        
        // Negación lógica
        boolean verdadero = true;
        System.out.println("!verdadero = " + (!verdadero)); // false
        
        // Complemento bit a bit
        int bits = 5; // 0000 0101
        System.out.println("~5 = " + (~bits)); // -6 (1111 1010)
        
        // ========== OPERADORES DE ASIGNACIÓN ==========
        System.out.println("\\n=== OPERADORES DE ASIGNACIÓN ===");
        
        int valor = 10;
        System.out.println("valor = " + valor);
        
        valor += 5;  // valor = valor + 5
        System.out.println("valor += 5: " + valor);
        
        valor -= 3;  // valor = valor - 3
        System.out.println("valor -= 3: " + valor);
        
        valor *= 2;  // valor = valor * 2
        System.out.println("valor *= 2: " + valor);
        
        valor /= 4;  // valor = valor / 4
        System.out.println("valor /= 4: " + valor);
        
        valor %= 3;  // valor = valor % 3
        System.out.println("valor %= 3: " + valor);
        
        // Operadores de asignación bit a bit
        int bits2 = 12; // 1100
        bits2 &= 10;    // 1100 & 1010 = 1000 (8)
        System.out.println("12 &= 10: " + bits2);
        
        bits2 |= 5;     // 1000 | 0101 = 1101 (13)
        System.out.println("bits2 |= 5: " + bits2);
        
        bits2 ^= 7;     // 1101 ^ 0111 = 1010 (10)
        System.out.println("bits2 ^= 7: " + bits2);
        
        bits2 <<= 1;    // 1010 << 1 = 10100 (20)
        System.out.println("bits2 <<= 1: " + bits2);
        
        bits2 >>= 2;    // 10100 >> 2 = 101 (5)
        System.out.println("bits2 >>= 2: " + bits2);
        
        // ========== OPERADORES RELACIONALES ==========
        System.out.println("\\n=== OPERADORES RELACIONALES ===");
        
        int p = 10, q = 20;
        
        System.out.println("p == q: " + (p == q));  // Igual a: false
        System.out.println("p != q: " + (p != q));  // Diferente de: true
        System.out.println("p > q: " + (p > q));    // Mayor que: false
        System.out.println("p < q: " + (p < q));    // Menor que: true
        System.out.println("p >= q: " + (p >= q));  // Mayor o igual: false
        System.out.println("p <= q: " + (p <= q));  // Menor o igual: true
        
        // Comparación de objetos
        String s1 = "Hola";
        String s2 = "Hola";
        String s3 = new String("Hola");
        
        System.out.println("\\nComparación de Strings:");
        System.out.println("s1 == s2: " + (s1 == s2));       // true (mismo objeto en pool)
        System.out.println("s1 == s3: " + (s1 == s3));       // false (objetos diferentes)
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true (mismo contenido)
        
        // ========== OPERADORES LÓGICOS ==========
        System.out.println("\\n=== OPERADORES LÓGICOS ===");
        
        boolean t = true, f = false;
        
        // AND lógico (&&) - cortocircuito
        System.out.println("true && true: " + (t && t));   // true
        System.out.println("true && false: " + (t && f));  // false
        System.out.println("false && true: " + (f && t));  // false
        System.out.println("false && false: " + (f && f)); // false
        
        // OR lógico (||) - cortocircuito
        System.out.println("\\ntrue || true: " + (t || t));   // true
        System.out.println("true || false: " + (t || f));  // true
        System.out.println("false || true: " + (f || t));  // true
        System.out.println("false || false: " + (f || f)); // false
        
        // NOT lógico (!)
        System.out.println("\\n!true: " + (!t));  // false
        System.out.println("!false: " + (!f)); // true
        
        // XOR lógico (^)
        System.out.println("\\ntrue ^ true: " + (t ^ t));   // false
        System.out.println("true ^ false: " + (t ^ f));  // true
        System.out.println("false ^ true: " + (f ^ t));  // true
        System.out.println("false ^ false: " + (f ^ f)); // false
        
        // Cortocircuito
        System.out.println("\\nCortocircuito:");
        int n = 0;
        // false && (n++ > 0) - no evalúa la segunda parte
        boolean resultado1 = false && (n++ > 0);
        System.out.println("Después de false &&: n = " + n); // n sigue siendo 0
        
        // true || (n++ > 0) - no evalúa la segunda parte
        boolean resultado2 = true || (n++ > 0);
        System.out.println("Después de true ||: n = " + n); // n sigue siendo 0
        
        // AND y OR sin cortocircuito (&, |)
        boolean resultado3 = false & (n++ > 0); // Evalúa ambas partes
        System.out.println("Después de false &: n = " + n); // n es 1
        
        // ========== OPERADORES BIT A BIT ==========
        System.out.println("\\n=== OPERADORES BIT A BIT ===");
        
        int m = 12; // 1100
        int n2 = 10; // 1010
        
        System.out.println("12 en binario: " + Integer.toBinaryString(m));
        System.out.println("10 en binario: " + Integer.toBinaryString(n2));
        
        System.out.println("\\n12 & 10 = " + (m & n2) + " (" + Integer.toBinaryString(m & n2) + ")");   // AND: 8 (1000)
        System.out.println("12 | 10 = " + (m | n2) + " (" + Integer.toBinaryString(m | n2) + ")");   // OR: 14 (1110)
        System.out.println("12 ^ 10 = " + (m ^ n2) + " (" + Integer.toBinaryString(m ^ n2) + ")");   // XOR: 6 (0110)
        System.out.println("~12 = " + (~m) + " (" + Integer.toBinaryString(~m) + ")");         // NOT: -13
        
        // Desplazamientos
        System.out.println("\\n12 << 2 = " + (m << 2) + " (" + Integer.toBinaryString(m << 2) + ")");  // Izq: 48 (110000)
        System.out.println("12 >> 2 = " + (m >> 2) + " (" + Integer.toBinaryString(m >> 2) + ")");  // Der: 3 (11)
        System.out.println("-12 >> 2 = " + (-m >> 2));  // Mantiene signo: -3
        System.out.println("-12 >>> 2 = " + (-m >>> 2)); // Sin signo: número grande positivo
        
        // ========== OPERADOR TERNARIO ==========
        System.out.println("\\n=== OPERADOR TERNARIO ===");
        
        int edad = 20;
        String categoria = (edad >= 18) ? "Adulto" : "Menor";
        System.out.println("Categoría: " + categoria);
        
        // Ternario anidado
        int nota = 85;
        String calificacion = (nota >= 90) ? "A" :
                             (nota >= 80) ? "B" :
                             (nota >= 70) ? "C" :
                             (nota >= 60) ? "D" : "F";
        System.out.println("Calificación: " + calificacion);
        
        // ========== OPERADOR INSTANCEOF ==========
        System.out.println("\\n=== OPERADOR INSTANCEOF ===");
        
        String texto = "Hola";
        Object objeto = "Mundo";
        Integer numero = 42;
        
        System.out.println("texto instanceof String: " + (texto instanceof String));
        System.out.println("objeto instanceof String: " + (objeto instanceof String));
        System.out.println("numero instanceof Integer: " + (numero instanceof Integer));
        System.out.println("numero instanceof Number: " + (numero instanceof Number));
        
        // ========== PRECEDENCIA DE OPERADORES ==========
        System.out.println("\\n=== PRECEDENCIA DE OPERADORES ===");
        
        int resultado = 2 + 3 * 4; // Multiplicación primero
        System.out.println("2 + 3 * 4 = " + resultado); // 14, no 20
        
        int resultado2 = (2 + 3) * 4; // Paréntesis primero
        System.out.println("(2 + 3) * 4 = " + resultado2); // 20
        
        boolean complejo = 5 > 3 && 10 < 20 || false;
        System.out.println("5 > 3 && 10 < 20 || false = " + complejo); // true
        
        System.out.println("\\nOrden de precedencia (mayor a menor):");
        System.out.println("1. Postfijo: expr++, expr--");
        System.out.println("2. Unario: ++expr, --expr, +, -, !, ~");
        System.out.println("3. Multiplicativo: *, /, %");
        System.out.println("4. Aditivo: +, -");
        System.out.println("5. Desplazamiento: <<, >>, >>>");
        System.out.println("6. Relacional: <, >, <=, >=, instanceof");
        System.out.println("7. Igualdad: ==, !=");
        System.out.println("8. AND bit a bit: &");
        System.out.println("9. XOR bit a bit: ^");
        System.out.println("10. OR bit a bit: |");
        System.out.println("11. AND lógico: &&");
        System.out.println("12. OR lógico: ||");
        System.out.println("13. Ternario: ? :");
        System.out.println("14. Asignación: =, +=, -=, etc.");
    }
}`,
      explanation: "Java tiene múltiples tipos de operadores: Aritméticos (+, -, *, /, %), Unarios (+, -, ++, --, !), Asignación (=, +=, -=, etc.), Relacionales (==, !=, >, <, >=, <=), Lógicos (&&, ||, !, ^), Bit a bit (&, |, ^, ~, <<, >>, >>>), Ternario (? :), e instanceof. Los operadores lógicos && y || usan cortocircuito (no evalúan la segunda parte si no es necesario), mientras que & y | siempre evalúan ambas partes. Los operadores bit a bit trabajan a nivel de bits. La precedencia determina el orden de evaluación; usa paréntesis para claridad. El operador ternario es una forma compacta de if-else. instanceof verifica el tipo de un objeto."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Conceptos Básicos de Java - Guía Completa</h1>
        <p className="text-lg text-gray-600 mb-6">
          Fundamentos esenciales explicados en profundidad sin omitir ningún detalle importante.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Guía Exhaustiva:</strong> Esta sección cubre TODOS los aspectos de los conceptos básicos de Java.
                Cada tema incluye explicaciones detalladas, ejemplos completos, casos especiales, y mejores prácticas.
                No se omite ningún concepto importante.
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

      <div className="mt-8 bg-green-50 border-l-4 border-green-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-green-700">
              <strong>Próximos pasos:</strong> Ahora que dominas los tipos de datos, variables y operadores,
              estás listo para aprender sobre estructuras de control (if, loops) y comenzar a crear
              programas más complejos. Practica estos conceptos antes de continuar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicConceptsExpanded;
