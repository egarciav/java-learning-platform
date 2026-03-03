import React from 'react';
import CodeExample from '../components/CodeExample';

const CollectionsAndArrays: React.FC = () => {
  const examples = [
    {
      title: "Arrays en Java",
      description: "Colecciones de tamaño fijo para almacenar elementos del mismo tipo",
      code: `// Arrays en Java

public class ArraysDemo {
    public static void main(String[] args) {
        // Declaración y creación de arrays
        
        // Método 1: Declarar y luego inicializar
        int[] numeros;
        numeros = new int[5]; // Array de 5 enteros, inicializados en 0
        
        // Método 2: Declarar y crear en una línea
        double[] precios = new double[3];
        
        // Método 3: Inicializar con valores
        String[] nombres = {"Ana", "Juan", "María", "Pedro"};
        int[] edades = {25, 30, 22, 35, 28};
        
        // Acceder a elementos (índice base 0)
        System.out.println("Primer nombre: " + nombres[0]); // "Ana"
        System.out.println("Última edad: " + edades[edades.length - 1]); // 28
        
        // Modificar elementos
        numeros[0] = 10;
        numeros[1] = 20;
        numeros[2] = 30;
        numeros[3] = 40;
        numeros[4] = 50;
        
        // Recorrer arrays con for tradicional
        System.out.println("\\n--- Recorrido con for tradicional ---");
        for (int i = 0; i < nombres.length; i++) {
            System.out.println("Índice " + i + ": " + nombres[i]);
        }
        
        // Recorrer arrays con for-each
        System.out.println("\\n--- Recorrido con for-each ---");
        for (String nombre : nombres) {
            System.out.println("Nombre: " + nombre);
        }
        
        // Array bidimensional (matriz)
        int[][] matriz = new int[3][3];
        matriz[0][0] = 1; matriz[0][1] = 2; matriz[0][2] = 3;
        matriz[1][0] = 4; matriz[1][1] = 5; matriz[1][2] = 6;
        matriz[2][0] = 7; matriz[2][1] = 8; matriz[2][2] = 9;
        
        System.out.println("\\n--- Matriz 3x3 ---");
        for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[i].length; j++) {
                System.out.print(matriz[i][j] + "\\t");
            }
            System.out.println();
        }
        
        // Operaciones comunes con arrays
        System.out.println("\\n--- Operaciones comunes ---");
        
        // Encontrar el máximo
        int maximo = encontrarMaximo(edades);
        System.out.println("Edad máxima: " + maximo);
        
        // Calcular promedio
        double promedio = calcularPromedio(edades);
        System.out.println("Promedio de edades: " + promedio);
        
        // Buscar elemento
        int posicion = buscarElemento(nombres, "María");
        if (posicion != -1) {
            System.out.println("María está en la posición: " + posicion);
        }
        
        // Ordenar array
        java.util.Arrays.sort(edades);
        System.out.println("Edades ordenadas: " + java.util.Arrays.toString(edades));
    }
    
    public static int encontrarMaximo(int[] array) {
        int max = array[0];
        for (int num : array) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    }
    
    public static double calcularPromedio(int[] array) {
        int suma = 0;
        for (int num : array) {
            suma += num;
        }
        return (double) suma / array.length;
    }
    
    public static int buscarElemento(String[] array, String elemento) {
        for (int i = 0; i < array.length; i++) {
            if (array[i].equals(elemento)) {
                return i;
            }
        }
        return -1; // No encontrado
    }
}`,
      explanation: "Los arrays son colecciones de tamaño fijo que almacenan elementos del mismo tipo. Se acceden mediante índices numéricos que empiezan en 0. Los arrays pueden ser unidimensionales (vectores) o multidimensionales (matrices). Los arrays tienen una propiedad 'length' que indica su tamaño. Son eficientes pero inflexibles en tamaño, por lo que para colecciones dinámicas se prefieren las clases del framework Collections."
    },
    {
      title: "ArrayList - Lista Dinámica",
      description: "Colección dinámica que puede crecer y reducirse automáticamente",
      code: `import java.util.ArrayList;
import java.util.List;

public class ArrayListDemo {
    public static void main(String[] args) {
        // Crear un ArrayList
        ArrayList<String> frutas = new ArrayList<>();
        
        // O usando la interfaz List (recomendado)
        List<Integer> numeros = new ArrayList<>();
        
        // Agregar elementos
        frutas.add("Manzana");
        frutas.add("Banana");
        frutas.add("Naranja");
        frutas.add("Fresa");
        
        numeros.add(10);
        numeros.add(20);
        numeros.add(30);
        
        System.out.println("Frutas: " + frutas);
        System.out.println("Números: " + numeros);
        
        // Agregar en posición específica
        frutas.add(1, "Pera"); // Inserta "Pera" en el índice 1
        System.out.println("Después de insertar Pera: " + frutas);
        
        // Acceder a elementos
        String primeraFruta = frutas.get(0);
        int segundoNumero = numeros.get(1);
        
        System.out.println("Primera fruta: " + primeraFruta);
        System.out.println("Segundo número: " + segundoNumero);
        
        // Modificar elementos
        frutas.set(0, "Manzana Verde");
        System.out.println("Fruta modificada: " + frutas.get(0));
        
        // Eliminar elementos
        frutas.remove("Banana"); // Elimina por valor
        numeros.remove(0); // Elimina por índice
        
        System.out.println("Después de eliminaciones:");
        System.out.println("Frutas: " + frutas);
        System.out.println("Números: " + numeros);
        
        // Verificar si contiene un elemento
        boolean tieneManzana = frutas.contains("Manzana Verde");
        boolean tieneCien = numeros.contains(100);
        
        System.out.println("¿Tiene manzana verde? " + tieneManzana);
        System.out.println("¿Tiene el número 100? " + tieneCien);
        
        // Obtener tamaño
        System.out.println("Tamaño de frutas: " + frutas.size());
        System.out.println("Tamaño de números: " + numeros.size());
        
        // Verificar si está vacío
        System.out.println("¿Está vacía la lista de frutas? " + frutas.isEmpty());
        
        // Recorrer ArrayList
        System.out.println("\\n--- Recorrer con for-each ---");
        for (String fruta : frutas) {
            System.out.println("Fruta: " + fruta);
        }
        
        System.out.println("\\n--- Recorrer con índices ---");
        for (int i = 0; i < frutas.size(); i++) {
            System.out.println("Índice " + i + ": " + frutas.get(i));
        }
        
        // Convertir a array
        String[] arrayFrutas = frutas.toArray(new String[0]);
        System.out.println("Convertido a array: " + java.util.Arrays.toString(arrayFrutas));
        
        // Limpiar la lista
        frutas.clear();
        System.out.println("Después de clear(), tamaño: " + frutas.size());
    }
}`,
      explanation: "ArrayList es una implementación de la interfaz List que proporciona un array dinámico. A diferencia de los arrays nativos, puede crecer y reducirse automáticamente. Es la colección más utilizada en Java. Los métodos principales son add() para agregar, get() para obtener, set() para modificar, remove() para eliminar, y contains() para verificar existencia. Siempre es preferible programar contra la interfaz (List) que contra la implementación (ArrayList)."
    },
    {
      title: "HashMap - Almacenamiento Clave-Valor",
      description: "Almacena pares clave-valor para acceso rápido mediante claves únicas",
      code: `import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        // Crear un HashMap
        HashMap<String, Integer> edades = new HashMap<>();
        
        // O usando la interfaz Map (recomendado)
        Map<String, String> capitales = new HashMap<>();
        
        // Agregar elementos (clave, valor)
        edades.put("Ana", 25);
        edades.put("Juan", 30);
        edades.put("María", 22);
        edades.put("Pedro", 35);
        
        capitales.put("España", "Madrid");
        capitales.put("Francia", "París");
        capitales.put("Italia", "Roma");
        capitales.put("Alemania", "Berlín");
        
        System.out.println("Edades: " + edades);
        System.out.println("Capitales: " + capitales);
        
        // Acceder a valores mediante claves
        Integer edadAna = edades.get("Ana");
        String capitalFrancia = capitales.get("Francia");
        
        System.out.println("Edad de Ana: " + edadAna);
        System.out.println("Capital de Francia: " + capitalFrancia);
        
        // Acceder con valor por defecto si la clave no existe
        Integer edadCarlos = edades.getOrDefault("Carlos", 0);
        System.out.println("Edad de Carlos (si no existe, 0): " + edadCarlos);
        
        // Verificar si contiene una clave o valor
        boolean tieneAna = edades.containsKey("Ana");
        boolean tieneEdad25 = edades.containsValue(25);
        
        System.out.println("¿Existe Ana? " + tieneAna);
        System.out.println("¿Alguien tiene 25 años? " + tieneEdad25);
        
        // Modificar un valor
        edades.put("Ana", 26); // Actualiza la edad de Ana
        System.out.println("Edad actualizada de Ana: " + edades.get("Ana"));
        
        // Eliminar elementos
        edades.remove("Pedro");
        capitales.remove("Italia");
        
        System.out.println("Después de eliminaciones:");
        System.out.println("Edades: " + edades);
        System.out.println("Capitales: " + capitales);
        
        // Obtener tamaño
        System.out.println("Tamaño de edades: " + edades.size());
        System.out.println("Tamaño de capitales: " + capitales.size());
        
        // Recorrer HashMap
        System.out.println("\\n--- Recorrer claves ---");
        for (String nombre : edades.keySet()) {
            System.out.println(nombre + ": " + edades.get(nombre));
        }
        
        System.out.println("\\n--- Recorrer valores ---");
        for (Integer edad : edades.values()) {
            System.out.println("Edad: " + edad);
        }
        
        System.out.println("\\n--- Recorrer pares clave-valor ---");
        for (Map.Entry<String, Integer> entrada : edades.entrySet()) {
            System.out.println(entrada.getKey() + " -> " + entrada.getValue());
        }
        
        // Limpiar el HashMap
        capitales.clear();
        System.out.println("Después de clear(), ¿está vacío? " + capitales.isEmpty());
        
        // Ejemplo práctico: diccionario de productos
        Map<String, Double> productos = new HashMap<>();
        productos.put("Laptop", 999.99);
        productos.put("Mouse", 25.50);
        productos.put("Teclado", 45.75);
        
        System.out.println("\\n--- Catálogo de productos ---");
        for (Map.Entry<String, Double> producto : productos.entrySet()) {
            System.out.printf("%s: $%.2f\\n", producto.getKey(), producto.getValue());
        }
    }
}`,
      explanation: "HashMap almacena pares clave-valor y permite acceso rápido a los valores mediante sus claves. Las claves deben ser únicas. Es ideal para búsquedas rápidas, diccionarios, cachés, y cuando necesitas asociar información. Los métodos principales son put() para agregar/actualizar, get() para obtener, containsKey() para verificar claves, y keySet()/values()/entrySet() para recorrer. El rendimiento es O(1) para operaciones básicas."
    },
    {
      title: "HashSet - Conjuntos de Elementos Únicos",
      description: "Colección que no permite elementos duplicados",
      code: `import java.util.HashSet;
import java.util.Set;

public class HashSetDemo {
    public static void main(String[] args) {
        // Crear un HashSet
        HashSet<String> colores = new HashSet<>();
        
        // O usando la interfaz Set (recomendado)
        Set<Integer> numeros = new HashSet<>();
        
        // Agregar elementos
        colores.add("Rojo");
        colores.add("Azul");
        colores.add("Verde");
        colores.add("Amarillo");
        
        numeros.add(10);
        numeros.add(20);
        numeros.add(30);
        numeros.add(10); // Duplicado, no se agregará
        
        System.out.println("Colores: " + colores);
        System.out.println("Números: " + numeros);
        
        // Intentar agregar duplicados
        boolean agregado1 = colores.add("Rojo"); // No se agrega, ya existe
        boolean agregado2 = colores.add("Morado"); // Sí se agrega
        
        System.out.println("¿Se agregó 'Rojo' duplicado? " + agregado1);
        System.out.println("¿Se agregó 'Morado'? " + agregado2);
        System.out.println("Colores actualizados: " + colores);
        
        // Eliminar elementos
        colores.remove("Azul");
        numeros.remove(20);
        
        System.out.println("Después de eliminaciones:");
        System.out.println("Colores: " + colores);
        System.out.println("Números: " + numeros);
        
        // Verificar si contiene un elemento
        boolean tieneVerde = colores.contains("Verde");
        boolean tieneCincuenta = numeros.contains(50);
        
        System.out.println("¿Tiene verde? " + tieneVerde);
        System.out.println("¿Tiene 50? " + tieneCincuenta);
        
        // Obtener tamaño
        System.out.println("Tamaño de colores: " + colores.size());
        System.out.println("Tamaño de números: " + numeros.size());
        
        // Recorrer HashSet
        System.out.println("\\n--- Recorrer colores ---");
        for (String color : colores) {
            System.out.println("Color: " + color);
        }
        
        // Operaciones de conjuntos
        Set<String> set1 = new HashSet<>();
        Set<String> set2 = new HashSet<>();
        
        set1.add("A");
        set1.add("B");
        set1.add("C");
        
        set2.add("B");
        set2.add("C");
        set2.add("D");
        
        System.out.println("\\nSet 1: " + set1);
        System.out.println("Set 2: " + set2);
        
        // Unión
        Set<String> union = new HashSet<>(set1);
        union.addAll(set2);
        System.out.println("Unión: " + union);
        
        // Intersección
        Set<String> interseccion = new HashSet<>(set1);
        interseccion.retainAll(set2);
        System.out.println("Intersección: " + interseccion);
        
        // Diferencia
        Set<String> diferencia = new HashSet<>(set1);
        diferencia.removeAll(set2);
        System.out.println("Diferencia (set1 - set2): " + diferencia);
        
        // Ejemplo práctico: eliminar duplicados de una lista
        java.util.ArrayList<String> listaConDuplicados = new java.util.ArrayList<>();
        listaConDuplicados.add("Java");
        listaConDuplicados.add("Python");
        listaConDuplicados.add("Java");
        listaConDuplicados.add("JavaScript");
        listaConDuplicados.add("Python");
        
        System.out.println("\\nLista con duplicados: " + listaConDuplicados);
        
        // Eliminar duplicados usando HashSet
        Set<String> sinDuplicados = new HashSet<>(listaConDuplicados);
        System.out.println("Sin duplicados: " + sinDuplicados);
        
        // Convertir de vuelta a lista si es necesario
        java.util.ArrayList<String> listaSinDuplicados = new java.util.ArrayList<>(sinDuplicados);
        System.out.println("Lista sin duplicados: " + listaSinDuplicados);
    }
}`,
      explanation: "HashSet es una implementación de Set que no permite elementos duplicados y no mantiene orden. Es ideal para eliminar duplicados, verificar existencia rápidamente, y operaciones matemáticas de conjuntos. Los elementos deben implementar correctamente los métodos equals() y hashCode(). Las operaciones principales son add(), remove(), contains(), y size(). También soporta operaciones de conjuntos como unión (addAll), intersección (retainAll), y diferencia (removeAll)."
    },
    {
      title: "Comparación de Colecciones",
      description: "Cuándo usar cada tipo de colección",
      code: `import java.util.*;

public class ComparacionColecciones {
    public static void main(String[] args) {
        // Array vs ArrayList
        System.out.println("=== Array vs ArrayList ===");
        
        // Array (tamaño fijo)
        String[] arrayFrutas = new String[3];
        arrayFrutas[0] = "Manzana";
        arrayFrutas[1] = "Banana";
        arrayFrutas[2] = "Naranja";
        
        // ArrayList (tamaño dinámico)
        List<String> listaFrutas = new ArrayList<>();
        listaFrutas.add("Manzana");
        listaFrutas.add("Banana");
        listaFrutas.add("Naranja");
        listaFrutas.add("Fresa"); // Puede crecer
        
        System.out.println("Array: " + Arrays.toString(arrayFrutas));
        System.out.println("ArrayList: " + listaFrutas);
        
        // HashMap vs ArrayList para búsqueda
        System.out.println("\\n=== HashMap vs ArrayList para búsqueda ===");
        
        // ArrayList para búsqueda (O(n))
        List<String> nombres = Arrays.asList(
            "Ana", "Juan", "María", "Pedro", "Luis", "Carlos", "Sofía"
        );
        
        // HashMap para búsqueda (O(1))
        Map<String, Integer> edades = new HashMap<>();
        edades.put("Ana", 25);
        edades.put("Juan", 30);
        edades.put("María", 22);
        edades.put("Pedro", 35);
        edades.put("Luis", 28);
        edades.put("Carlos", 33);
        edades.put("Sofía", 27);
        
        String buscar = "María";
        
        // Búsqueda en ArrayList
        long inicio = System.nanoTime();
        boolean encontradoLista = nombres.contains(buscar);
        long finLista = System.nanoTime();
        
        // Búsqueda en HashMap
        long inicio2 = System.nanoTime();
        Integer edad = edades.get(buscar);
        long finHashMap = System.nanoTime();
        
        System.out.println("¿Encontrado en ArrayList? " + encontradoLista + 
                          " (Tiempo: " + (finLista - inicio) + " ns)");
        System.out.println("Edad en HashMap: " + edad + 
                          " (Tiempo: " + (finHashMap - inicio2) + " ns)");
        
        // HashSet para elementos únicos
        System.out.println("\\n=== HashSet para elementos únicos ===");
        
        List<Integer> numerosConDuplicados = Arrays.asList(
            1, 2, 3, 2, 4, 5, 3, 6, 1, 7, 8, 5
        );
        
        System.out.println("Con duplicados: " + numerosConDuplicados);
        
        // Eliminar duplicados
        Set<Integer> numerosUnicos = new HashSet<>(numerosConDuplicados);
        System.out.println("Sin duplicados: " + numerosUnicos);
        
        // Guía de uso
        System.out.println("\\n=== Guía de uso de colecciones ===");
        System.out.println("Array: Cuando necesitas tamaño fijo y máximo rendimiento");
        System.out.println("ArrayList: Cuando necesitas lista dinámica y acceso por índice");
        System.out.println("HashMap: Cuando necesitas búsqueda rápida por clave");
        System.out.println("HashSet: Cuando necesitas elementos únicos y búsqueda rápida");
        System.out.println("LinkedList: Cuando necesitas muchas inserciones/eliminaciones");
    }
}`,
      explanation: "La elección de la colección correcta depende del uso específico: Arrays para tamaño fijo y máximo rendimiento, ArrayList para listas dinámicas con acceso por índice, HashMap para búsquedas rápidas por clave, HashSet para elementos únicos, y LinkedList para muchas inserciones/eliminaciones. Considera factores como tamaño (fijo vs dinámico), orden (mantenido o no), duplicados (permitidos o no), y operaciones frecuentes (búsqueda, inserción, eliminación)."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Colecciones y Arrays</h1>
        <p className="text-lg text-gray-600 mb-6">
          Aprende a manejar grupos de datos eficientemente con arrays y el framework Collections.
        </p>
        
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>Importante:</strong> Las colecciones son fundamentales en Java para manejar 
                datos de manera eficiente. Dominarlas te permitirá escribir código más limpio 
                y performante, especialmente en aplicaciones empresariales con Spring Boot.
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

      <div className="mt-8 bg-orange-50 border-l-4 border-orange-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-orange-700">
              <strong>Ejercicio integrador:</strong> Crea un sistema de inventario que use 
              HashMap para productos con precios, ArrayList para el carrito de compras, 
              y HashSet para categorías únicas. Implementa operaciones CRUD y búsquedas eficientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsAndArrays;
