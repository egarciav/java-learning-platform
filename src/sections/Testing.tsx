import React from 'react';
import CodeExample from '../components/CodeExample';

const Testing: React.FC = () => {
  const junitBasicCode = `// JUNIT 5 - FUNDAMENTOS

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

// Clase a testear
class Calculadora {
    public int sumar(int a, int b) {
        return a + b;
    }
    
    public int restar(int a, int b) {
        return a - b;
    }
    
    public double dividir(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("No se puede dividir por cero");
        }
        return (double) a / b;
    }
    
    public boolean esPar(int numero) {
        return numero % 2 == 0;
    }
}

// Clase de tests
class CalculadoraTest {
    
    private Calculadora calculadora;
    
    // Se ejecuta antes de CADA test
    @BeforeEach
    void setUp() {
        calculadora = new Calculadora();
        System.out.println("Inicializando test");
    }
    
    // Se ejecuta después de CADA test
    @AfterEach
    void tearDown() {
        System.out.println("Finalizando test");
    }
    
    // Se ejecuta UNA VEZ antes de todos los tests
    @BeforeAll
    static void setUpAll() {
        System.out.println("Iniciando suite de tests");
    }
    
    // Se ejecuta UNA VEZ después de todos los tests
    @AfterAll
    static void tearDownAll() {
        System.out.println("Finalizando suite de tests");
    }
    
    // Test básico
    @Test
    void testSumar() {
        int resultado = calculadora.sumar(2, 3);
        assertEquals(5, resultado);
    }
    
    // Test con mensaje personalizado
    @Test
    void testRestar() {
        int resultado = calculadora.restar(10, 4);
        assertEquals(6, resultado, "10 - 4 debería ser 6");
    }
    
    // Test de excepciones
    @Test
    void testDividirPorCero() {
        assertThrows(IllegalArgumentException.class, () -> {
            calculadora.dividir(10, 0);
        });
    }
    
    // Test con múltiples assertions
    @Test
    void testDividir() {
        double resultado = calculadora.dividir(10, 2);
        assertEquals(5.0, resultado);
        assertTrue(resultado > 0);
        assertFalse(resultado < 0);
    }
    
    // Test de booleanos
    @Test
    void testEsPar() {
        assertTrue(calculadora.esPar(4));
        assertFalse(calculadora.esPar(5));
    }
    
    // Test deshabilitado
    @Test
    @Disabled("Test en desarrollo")
    void testEnDesarrollo() {
        fail("Este test aún no está implementado");
    }
    
    // Test con timeout
    @Test
    @Timeout(1) // Debe completarse en 1 segundo
    void testConTimeout() {
        calculadora.sumar(1, 1);
    }
    
    // Test con nombre descriptivo
    @Test
    @DisplayName("Suma de números negativos")
    void testSumarNegativos() {
        assertEquals(-5, calculadora.sumar(-2, -3));
    }
}`;

  const assertionsCode = `// ASSERTIONS EN JUNIT 5

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.*;

class AssertionsTest {
    
    @Test
    void testAssertEquals() {
        // Comparar valores
        assertEquals(5, 2 + 3);
        assertEquals("Hola", "Hola");
        assertEquals(3.14, 3.14, 0.001); // Con delta para doubles
    }
    
    @Test
    void testAssertNotEquals() {
        assertNotEquals(5, 3);
        assertNotEquals("Hola", "Adios");
    }
    
    @Test
    void testAssertTrue() {
        assertTrue(5 > 3);
        assertTrue("Java".startsWith("J"));
    }
    
    @Test
    void testAssertFalse() {
        assertFalse(3 > 5);
        assertFalse("Java".startsWith("P"));
    }
    
    @Test
    void testAssertNull() {
        String texto = null;
        assertNull(texto);
    }
    
    @Test
    void testAssertNotNull() {
        String texto = "Hola";
        assertNotNull(texto);
    }
    
    @Test
    void testAssertSame() {
        String a = "Hola";
        String b = a;
        assertSame(a, b); // Misma referencia
    }
    
    @Test
    void testAssertNotSame() {
        String a = new String("Hola");
        String b = new String("Hola");
        assertNotSame(a, b); // Diferentes referencias
        assertEquals(a, b); // Pero mismo contenido
    }
    
    @Test
    void testAssertArrayEquals() {
        int[] esperado = {1, 2, 3};
        int[] actual = {1, 2, 3};
        assertArrayEquals(esperado, actual);
    }
    
    @Test
    void testAssertIterableEquals() {
        List<String> esperado = Arrays.asList("A", "B", "C");
        List<String> actual = Arrays.asList("A", "B", "C");
        assertIterableEquals(esperado, actual);
    }
    
    @Test
    void testAssertThrows() {
        // Verificar que se lanza excepción
        Exception exception = assertThrows(
            ArithmeticException.class,
            () -> {
                int resultado = 10 / 0;
            }
        );
        
        // Verificar mensaje de la excepción
        assertEquals("/ by zero", exception.getMessage());
    }
    
    @Test
    void testAssertDoesNotThrow() {
        // Verificar que NO se lanza excepción
        assertDoesNotThrow(() -> {
            int resultado = 10 / 2;
        });
    }
    
    @Test
    void testAssertAll() {
        // Ejecuta todas las assertions aunque algunas fallen
        assertAll(
            "Verificaciones múltiples",
            () -> assertEquals(5, 2 + 3),
            () -> assertTrue(5 > 3),
            () -> assertNotNull("Hola")
        );
    }
    
    @Test
    void testAssertTimeout() {
        // Verifica que se complete en el tiempo especificado
        assertTimeout(
            java.time.Duration.ofSeconds(1),
            () -> {
                Thread.sleep(500);
            }
        );
    }
    
    @Test
    void testFail() {
        // Forzar fallo de test
        if (true) {
            return; // Test pasa
        }
        fail("Este test debería fallar");
    }
}`;

  const mockitoCode = `// MOCKITO - MOCKING Y TESTING

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

// Clases a testear
interface UsuarioRepository {
    Usuario buscarPorId(Long id);
    void guardar(Usuario usuario);
    List<Usuario> buscarTodos();
}

class Usuario {
    private Long id;
    private String nombre;
    private String email;
    
    public Usuario(Long id, String nombre, String email) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    }
    
    // Getters y setters
    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
}

class UsuarioService {
    private final UsuarioRepository repository;
    
    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }
    
    public Usuario obtenerUsuario(Long id) {
        return repository.buscarPorId(id);
    }
    
    public void crearUsuario(Usuario usuario) {
        if (usuario.getNombre() == null || usuario.getNombre().isEmpty()) {
            throw new IllegalArgumentException("Nombre requerido");
        }
        repository.guardar(usuario);
    }
    
    public int contarUsuarios() {
        return repository.buscarTodos().size();
    }
}

// Tests con Mockito
@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {
    
    @Mock
    private UsuarioRepository repository;
    
    @InjectMocks
    private UsuarioService service;
    
    @Test
    void testObtenerUsuario() {
        // Arrange: Configurar el mock
        Usuario usuarioMock = new Usuario(1L, "Ana", "ana@email.com");
        when(repository.buscarPorId(1L)).thenReturn(usuarioMock);
        
        // Act: Ejecutar el método
        Usuario resultado = service.obtenerUsuario(1L);
        
        // Assert: Verificar resultado
        assertNotNull(resultado);
        assertEquals("Ana", resultado.getNombre());
        assertEquals("ana@email.com", resultado.getEmail());
        
        // Verify: Verificar que se llamó al método
        verify(repository).buscarPorId(1L);
    }
    
    @Test
    void testCrearUsuario() {
        // Arrange
        Usuario usuario = new Usuario(null, "Juan", "juan@email.com");
        
        // Act
        service.crearUsuario(usuario);
        
        // Verify: Verificar que se llamó a guardar
        verify(repository).guardar(usuario);
        verify(repository, times(1)).guardar(usuario);
    }
    
    @Test
    void testCrearUsuarioSinNombre() {
        // Arrange
        Usuario usuario = new Usuario(null, "", "email@test.com");
        
        // Assert: Verificar que lanza excepción
        assertThrows(IllegalArgumentException.class, () -> {
            service.crearUsuario(usuario);
        });
        
        // Verify: Verificar que NO se llamó a guardar
        verify(repository, never()).guardar(any());
    }
    
    @Test
    void testContarUsuarios() {
        // Arrange
        List<Usuario> usuarios = Arrays.asList(
            new Usuario(1L, "Ana", "ana@email.com"),
            new Usuario(2L, "Juan", "juan@email.com")
        );
        when(repository.buscarTodos()).thenReturn(usuarios);
        
        // Act
        int cantidad = service.contarUsuarios();
        
        // Assert
        assertEquals(2, cantidad);
    }
    
    @Test
    void testVerificarLlamadas() {
        // Configurar mock
        when(repository.buscarPorId(anyLong())).thenReturn(
            new Usuario(1L, "Test", "test@email.com")
        );
        
        // Ejecutar
        service.obtenerUsuario(1L);
        service.obtenerUsuario(2L);
        
        // Verificar número de llamadas
        verify(repository, times(2)).buscarPorId(anyLong());
        verify(repository, atLeast(1)).buscarPorId(anyLong());
        verify(repository, atMost(3)).buscarPorId(anyLong());
    }
    
    @Test
    void testArgumentCaptor() {
        // Capturar argumentos pasados al mock
        ArgumentCaptor<Usuario> captor = ArgumentCaptor.forClass(Usuario.class);
        
        Usuario usuario = new Usuario(null, "María", "maria@email.com");
        service.crearUsuario(usuario);
        
        // Capturar el argumento
        verify(repository).guardar(captor.capture());
        
        // Verificar el argumento capturado
        Usuario capturado = captor.getValue();
        assertEquals("María", capturado.getNombre());
    }
    
    @Test
    void testDoThrow() {
        // Configurar mock para lanzar excepción
        doThrow(new RuntimeException("Error de BD"))
            .when(repository).guardar(any());
        
        Usuario usuario = new Usuario(null, "Test", "test@email.com");
        
        assertThrows(RuntimeException.class, () -> {
            service.crearUsuario(usuario);
        });
    }
}`;

  const parametrizedCode = `// TESTS PARAMETRIZADOS

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.*;
import java.util.stream.Stream;
import static org.junit.jupiter.api.Assertions.*;

class Validador {
    public boolean esEmailValido(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }
    
    public boolean esPar(int numero) {
        return numero % 2 == 0;
    }
    
    public String capitalizar(String texto) {
        if (texto == null || texto.isEmpty()) return texto;
        return texto.substring(0, 1).toUpperCase() + texto.substring(1);
    }
}

class ValidadorTest {
    
    private Validador validador = new Validador();
    
    // Test con múltiples valores
    @ParameterizedTest
    @ValueSource(strings = {"test@email.com", "user@domain.org", "admin@site.net"})
    void testEmailsValidos(String email) {
        assertTrue(validador.esEmailValido(email));
    }
    
    @ParameterizedTest
    @ValueSource(strings = {"invalido", "sin@punto", "@nodomain", ""})
    void testEmailsInvalidos(String email) {
        assertFalse(validador.esEmailValido(email));
    }
    
    // Test con números
    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8, 10})
    void testNumerosPares(int numero) {
        assertTrue(validador.esPar(numero));
    }
    
    // Test con CSV
    @ParameterizedTest
    @CsvSource({
        "hola, Hola",
        "java, Java",
        "test, Test"
    })
    void testCapitalizar(String entrada, String esperado) {
        assertEquals(esperado, validador.capitalizar(entrada));
    }
    
    // Test con CSV de archivo
    @ParameterizedTest
    @CsvFileSource(resources = "/test-data.csv", numLinesToSkip = 1)
    void testDesdeArchivo(String entrada, String esperado) {
        assertEquals(esperado, validador.capitalizar(entrada));
    }
    
    // Test con método proveedor
    @ParameterizedTest
    @MethodSource("proveedorDeEmails")
    void testEmailsConMetodo(String email) {
        assertTrue(validador.esEmailValido(email));
    }
    
    static Stream<String> proveedorDeEmails() {
        return Stream.of(
            "test@email.com",
            "user@domain.org",
            "admin@site.net"
        );
    }
    
    // Test con múltiples argumentos
    @ParameterizedTest
    @MethodSource("proveedorDeArgumentos")
    void testMultiplesArgumentos(int numero, boolean esperado) {
        assertEquals(esperado, validador.esPar(numero));
    }
    
    static Stream<Arguments> proveedorDeArgumentos() {
        return Stream.of(
            Arguments.of(2, true),
            Arguments.of(3, false),
            Arguments.of(4, true),
            Arguments.of(5, false)
        );
    }
    
    // Test con enum
    @ParameterizedTest
    @EnumSource(DayOfWeek.class)
    void testConEnum(DayOfWeek dia) {
        assertNotNull(dia);
    }
    
    // Test con null y empty
    @ParameterizedTest
    @NullSource
    void testConNull(String valor) {
        assertFalse(validador.esEmailValido(valor));
    }
    
    @ParameterizedTest
    @EmptySource
    void testConVacio(String valor) {
        assertFalse(validador.esEmailValido(valor));
    }
    
    @ParameterizedTest
    @NullAndEmptySource
    void testConNullYVacio(String valor) {
        assertFalse(validador.esEmailValido(valor));
    }
}`;

  const examples = [
    {
      title: "JUnit 5 - Fundamentos",
      description: "Tests básicos, assertions y ciclo de vida",
      code: junitBasicCode,
      explanation: "JUnit 5 es el framework estándar para testing en Java. @Test marca métodos de test. @BeforeEach/@AfterEach se ejecutan antes/después de cada test. @BeforeAll/@AfterAll se ejecutan una vez antes/después de todos los tests (deben ser static). assertEquals verifica igualdad, assertTrue/assertFalse verifican booleanos, assertThrows verifica excepciones. @Disabled deshabilita tests. @Timeout limita tiempo de ejecución. @DisplayName proporciona nombres descriptivos. Los tests deben ser independientes, repetibles y rápidos."
    },
    {
      title: "Assertions Completas en JUnit",
      description: "Todas las assertions disponibles y sus usos",
      code: assertionsCode,
      explanation: "JUnit proporciona múltiples assertions: assertEquals/assertNotEquals (igualdad), assertTrue/assertFalse (booleanos), assertNull/assertNotNull (nulos), assertSame/assertNotSame (referencias), assertArrayEquals (arrays), assertIterableEquals (colecciones), assertThrows (excepciones), assertDoesNotThrow (sin excepciones), assertAll (múltiples assertions), assertTimeout (tiempo límite), fail (forzar fallo). Usa el tercer parámetro para mensajes personalizados. assertAll ejecuta todas las assertions aunque algunas fallen, útil para ver todos los errores a la vez."
    },
    {
      title: "Mockito - Mocking y Stubbing",
      description: "Testing con mocks y verificación de comportamiento",
      code: mockitoCode,
      explanation: "Mockito permite crear mocks (objetos simulados) para testing. @Mock crea un mock, @InjectMocks inyecta mocks en la clase a testear. @ExtendWith(MockitoExtension.class) habilita Mockito. when().thenReturn() configura comportamiento del mock. verify() verifica que se llamó un método. times(), never(), atLeast(), atMost() verifican número de llamadas. any(), anyLong(), anyString() son matchers para argumentos. ArgumentCaptor captura argumentos pasados al mock. doThrow() configura excepciones. Los mocks aíslan la clase bajo test de sus dependencias."
    },
    {
      title: "Tests Parametrizados",
      description: "Ejecutar el mismo test con diferentes datos",
      code: parametrizedCode,
      explanation: "@ParameterizedTest ejecuta el mismo test con diferentes valores. @ValueSource proporciona valores simples (strings, ints, etc.). @CsvSource proporciona múltiples argumentos en formato CSV. @CsvFileSource lee datos de archivo. @MethodSource usa un método que retorna Stream de argumentos. @EnumSource usa valores de enum. @NullSource/@EmptySource/@NullAndEmptySource prueban casos especiales. Los tests parametrizados reducen duplicación y facilitan probar múltiples casos. Útil para validaciones, conversiones, y casos límite."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Testing con JUnit y Mockito</h1>
        <p className="text-lg text-gray-600 mb-6">
          Testing automatizado: JUnit 5, assertions, mocking con Mockito y tests parametrizados.
        </p>
        
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-purple-700">
                <strong>Testing Esencial:</strong> El testing automatizado es fundamental en desarrollo profesional.
                JUnit y Mockito son los estándares de la industria para testing en Java. Los tests garantizan
                calidad, facilitan refactoring, y documentan el comportamiento esperado del código.
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
              <strong>Mejores prácticas de Testing:</strong> Escribe tests antes o durante el desarrollo (TDD),
              mantén tests independientes, usa nombres descriptivos, sigue el patrón AAA (Arrange-Act-Assert),
              mockea dependencias externas, mantén tests rápidos, y apunta a alta cobertura de código crítico.
              Un test debe fallar solo cuando el código está roto.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-6">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">
              🎉 ¡Felicitaciones! Has Completado la Plataforma
            </h3>
            <p className="text-sm text-indigo-800 mb-4">
              Has recorrido un camino completo desde los conceptos básicos de Java hasta temas avanzados
              como Spring Boot, JPA, Concurrencia y Testing. Ahora tienes las herramientas para:
            </p>
            <ul className="list-disc list-inside text-sm text-indigo-800 space-y-1 mb-4">
              <li>Desarrollar aplicaciones Java profesionales</li>
              <li>Crear APIs REST con Spring Boot</li>
              <li>Trabajar con bases de datos usando JPA</li>
              <li>Implementar programación concurrente</li>
              <li>Escribir código testeable y mantener calidad</li>
              <li>Aplicar programación funcional con Streams y Lambdas</li>
            </ul>
            <p className="text-sm text-indigo-800 font-semibold">
              ¡Continúa practicando y construyendo proyectos reales para consolidar tu conocimiento!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testing;
