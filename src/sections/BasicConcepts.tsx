import React from 'react';
import CodeExample from '../components/CodeExample';

const BasicConcepts: React.FC = () => {
  const examples = [
    {
      title: "Variables y Tipos de Datos",
      description: "Aprende sobre las variables y los tipos de datos básicos en Java",
      code: `// Variables y tipos de datos básicos en Java

// Tipos primitivos
int edad = 25;                    // Números enteros
double precio = 99.99;            // Números decimales
boolean esEstudiante = true;      // Valores true/false
char inicial = 'J';               // Un solo carácter
float altura = 1.75f;             // Números decimales (precisión simple)

// Tipos de referencia (objetos)
String nombre = "Juan Pérez";     // Cadena de texto
Integer numero = 42;              // Versión objeto de int

// Constantes (no pueden cambiar su valor)
final double PI = 3.14159;        // Constante matemática
static final int MAX_EDAD = 120;  // Constante de clase

// Ejemplo de uso
public class Persona {
    public static void main(String[] args) {
        String nombre = "Ana";
        int edad = 30;
        
        System.out.println("Nombre: " + nombre);
        System.out.println("Edad: " + edad);
    }
}`,
      explanation: "En Java, las variables son contenedores de datos que tienen un tipo específico. Los tipos primitivos (int, double, boolean, char, float) almacenan valores directamente, mientras que los tipos de referencia (String, Integer) almacenan referencias a objetos. Las variables declaradas con 'final' no pueden modificar su valor después de la inicialización, convirtiéndose en constantes."
    },
    {
      title: "Operadores en Java",
      description: "Conoce los diferentes tipos de operadores y su uso",
      code: `// Operadores en Java

public class OperadoresDemo {
    public static void main(String[] args) {
        int a = 10, b = 3;
        
        // Operadores aritméticos
        System.out.println("Suma: " + (a + b));        // 13
        System.out.println("Resta: " + (a - b));       // 7
        System.out.println("Multiplicación: " + (a * b)); // 30
        System.out.println("División: " + (a / b));    // 3 (división entera)
        System.out.println("Módulo: " + (a % b));      // 1 (resto)
        
        // Operadores de asignación
        int x = 5;
        x += 3;  // x = x + 3 = 8
        x *= 2;  // x = x * 2 = 16
        
        // Operadores de comparación
        System.out.println("a > b: " + (a > b));       // true
        System.out.println("a == b: " + (a == b));     // false
        System.out.println("a != b: " + (a != b));     // true
        
        // Operadores lógicos
        boolean esMayor = a > b;
        boolean esPositivo = a > 0;
        System.out.println("AND: " + (esMayor && esPositivo)); // true
        System.out.println("OR: " + (esMayor || esPositivo));  // true
        System.out.println("NOT: " + (!esMayor));              // false
        
        // Operadores de incremento/decremento
        int contador = 0;
        contador++;    // contador = 1 (post-incremento)
        ++contador;    // contador = 2 (pre-incremento)
        contador--;    // contador = 1 (post-decremento)
    }
}`,
      explanation: "Los operadores en Java permiten realizar operaciones sobre variables y valores. Los operadores aritméticos realizan cálculos matemáticos, los de comparación evalúan relaciones entre valores, y los lógicos combinan condiciones booleanas. Los operadores de asignación compuesta (+=, *=, etc.) simplifican operaciones comunes. Los operadores de incremento (++) y decremento (--) modifican variables en 1."
    },
    {
      title: "Entrada y Salida de Datos",
      description: "Cómo interactuar con el usuario mediante entrada y salida",
      code: `import java.util.Scanner;  // Importar clase para leer entrada

public class EntradaSalida {
    public static void main(String[] args) {
        // Crear objeto Scanner para leer entrada del teclado
        Scanner scanner = new Scanner(System.in);
        
        // Salida de datos
        System.out.println("¡Bienvenido al programa de Java!");
        System.out.print("Por favor, ingresa tu nombre: ");
        
        // Leer entrada de texto
        String nombre = scanner.nextLine();
        
        System.out.print("Ingresa tu edad: ");
        int edad = scanner.nextInt();
        
        System.out.print("Ingresa tu altura (metros): ");
        double altura = scanner.nextDouble();
        
        // Salida formateada
        System.out.println("\\n=== Datos Ingresados ===");
        System.out.println("Nombre: " + nombre);
        System.out.println("Edad: " + edad + " años");
        System.out.printf("Altura: %.2f metros\\n", altura);
        
        // Salida con printf (formato avanzado)
        System.out.printf("Hola %s, tienes %d años y mides %.2f metros.\\n", 
                         nombre, edad, altura);
        
        // Cerrar el scanner (importante para liberar recursos)
        scanner.close();
    }
}`,
      explanation: "La clase Scanner permite leer entrada del usuario desde el teclado. System.out.println() imprime texto con salto de línea, mientras que System.out.print() imprime sin salto. System.out.printf() permite formatear la salida con especificadores como %s (texto), %d (enteros), %.2f (decimales con 2 cifras). Es importante cerrar el Scanner con scanner.close() para liberar recursos."
    },
    {
      title: "Conversión entre Tipos (Casting)",
      description: "Cómo convertir entre diferentes tipos de datos",
      code: `public class CastingDemo {
    public static void main(String[] args) {
        // Casting implícito (automático, de menor a mayor)
        int entero = 100;
        double decimal = entero;  // int -> double (automático)
        System.out.println("Entero a double: " + decimal);
        
        // Casting explícito (manual, de mayor a menor)
        double precio = 99.99;
        int precioEntero = (int) precio;  // double -> int (pierde decimales)
        System.out.println("Double a int: " + precioEntero);
        
        // Casting entre tipos numéricos
        long numeroGrande = 1000000L;
        int numeroPequeno = (int) numeroGrande;
        
        float flotante = 3.14f;
        double doble = flotante;  // float -> double (automático)
        
        // Casting de String a número
        String textoNumero = "123";
        int numeroDesdeTexto = Integer.parseInt(textoNumero);
        double decimalDesdeTexto = Double.parseDouble("45.67");
        
        // Casting de número a String
        int valor = 42;
        String texto = String.valueOf(valor);
        String texto2 = Integer.toString(valor);
        String texto3 = valor + "";  // Concatenación (menos recomendado)
        
        // Ejemplo práctico
        double temperatura = 36.6;
        int temperaturaEntera = (int) temperatura;
        
        System.out.println("Temperatura original: " + temperatura);
        System.out.println("Temperatura entera: " + temperaturaEntera);
        
        // Precaución: pérdida de información
        double valor Grande = 123456789.987;
        int valorPequeno = (int) valorGrande;  // ¡Peligro! Puede perder información
        System.out.println("Pérdida de información: " + valorPequeno);
    }
}`,
      explanation: "El casting es la conversión entre tipos de datos. El casting implícito ocurre automáticamente cuando convertimos de un tipo más pequeño a uno más grande (int a double). El casting explícito requiere paréntesis y se usa cuando convertimos de un tipo más grande a uno más pequeño (double a int), lo que puede causar pérdida de información. Para convertir String a números usamos métodos como Integer.parseInt(), y para números a String usamos String.valueOf()."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Conceptos Básicos de Java</h1>
        <p className="text-lg text-gray-600 mb-6">
          Fundamentos esenciales que todo programador Java debe conocer desde el inicio.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Importante:</strong> Estos conceptos son la base para todo desarrollo en Java. 
                Dominarlos te permitirá entender estructuras más complejas como Spring Boot.
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
              <strong>Consejo de aprendizaje:</strong> Practica cada ejemplo modificando los valores 
              y observa cómo cambian los resultados. Experimenta con diferentes tipos de datos 
              y operadores para solidificar tu comprensión.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicConcepts;
