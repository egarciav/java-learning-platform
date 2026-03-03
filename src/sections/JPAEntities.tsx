import React from 'react';
import CodeExample from '../components/CodeExample';

const JPAEntities: React.FC = () => {
  const examples = [
    {
      title: "Entidades JPA - Fundamentos",
      description: "Mapeo objeto-relacional con JPA y anotaciones básicas",
      code: `// ENTIDADES JPA - FUNDAMENTOS

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

// @Entity marca la clase como entidad JPA (tabla en BD)
@Entity
@Table(name = "usuarios") // Nombre de la tabla (opcional si coincide con nombre de clase)
public class Usuario {
    
    // ========== CLAVE PRIMARIA ==========
    
    @Id // Marca el campo como clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremento
    @Column(name = "id") // Nombre de columna (opcional si coincide)
    private Long id;
    
    // Otras estrategias de generación:
    // IDENTITY: auto-incremento de BD (MySQL, PostgreSQL)
    // SEQUENCE: usa secuencias de BD (Oracle, PostgreSQL)
    // TABLE: usa tabla auxiliar
    // AUTO: JPA elige automáticamente
    
    // ========== COLUMNAS BÁSICAS ==========
    
    @Column(
        name = "nombre",           // Nombre de columna
        nullable = false,          // NOT NULL
        length = 100,              // VARCHAR(100)
        unique = false             // UNIQUE constraint
    )
    private String nombre;
    
    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;
    
    @Column(name = "edad")
    private Integer edad;
    
    @Column(name = "activo", columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean activo = true;
    
    @Column(name = "salario", precision = 10, scale = 2) // DECIMAL(10,2)
    private Double salario;
    
    // ========== TIPOS TEMPORALES ==========
    
    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento; // DATE
    
    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro; // DATETIME/TIMESTAMP
    
    // Para java.util.Date (legacy)
    // @Temporal(TemporalType.DATE)
    // private Date fecha;
    
    // @Temporal(TemporalType.TIME)
    // private Date hora;
    
    // @Temporal(TemporalType.TIMESTAMP)
    // private Date fechaHora;
    
    // ========== CAMPOS GRANDES ==========
    
    @Lob // Large Object (TEXT, BLOB)
    @Column(name = "descripcion")
    private String descripcion; // TEXT
    
    @Lob
    @Column(name = "foto")
    private byte[] foto; // BLOB
    
    // ========== ENUMS ==========
    
    @Enumerated(EnumType.STRING) // Guarda el nombre del enum
    @Column(name = "rol", length = 20)
    private Rol rol;
    
    // @Enumerated(EnumType.ORDINAL) // Guarda el índice (0, 1, 2...)
    // private Rol rol; // NO recomendado (cambia si reordenas el enum)
    
    public enum Rol {
        ADMIN, USER, GUEST
    }
    
    // ========== CAMPOS TRANSITORIOS ==========
    
    @Transient // No se persiste en BD
    private String nombreCompleto;
    
    public String getNombreCompleto() {
        return nombre + " (" + email + ")";
    }
    
    // ========== AUDITORÍA ==========
    
    @Column(name = "creado_en", updatable = false) // No se actualiza
    private LocalDateTime creadoEn;
    
    @Column(name = "actualizado_en")
    private LocalDateTime actualizadoEn;
    
    @Column(name = "creado_por", updatable = false)
    private String creadoPor;
    
    @Column(name = "actualizado_por")
    private String actualizadoPor;
    
    // ========== CALLBACKS DE CICLO DE VIDA ==========
    
    @PrePersist // Antes de INSERT
    protected void onCreate() {
        creadoEn = LocalDateTime.now();
        actualizadoEn = LocalDateTime.now();
        if (activo == null) {
            activo = true;
        }
    }
    
    @PreUpdate // Antes de UPDATE
    protected void onUpdate() {
        actualizadoEn = LocalDateTime.now();
    }
    
    @PostPersist // Después de INSERT
    protected void afterCreate() {
        System.out.println("Usuario creado con ID: " + id);
    }
    
    @PostUpdate // Después de UPDATE
    protected void afterUpdate() {
        System.out.println("Usuario actualizado: " + id);
    }
    
    @PreRemove // Antes de DELETE
    protected void beforeDelete() {
        System.out.println("Eliminando usuario: " + id);
    }
    
    @PostRemove // Después de DELETE
    protected void afterDelete() {
        System.out.println("Usuario eliminado");
    }
    
    @PostLoad // Después de cargar desde BD
    protected void afterLoad() {
        // Inicializar campos transitorios
        this.nombreCompleto = getNombreCompleto();
    }
    
    // ========== CONSTRUCTORES ==========
    
    public Usuario() {
        // Constructor vacío requerido por JPA
    }
    
    public Usuario(String nombre, String email, Integer edad) {
        this.nombre = nombre;
        this.email = email;
        this.edad = edad;
    }
    
    // ========== GETTERS Y SETTERS ==========
    
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
    
    public Double getSalario() {
        return salario;
    }
    
    public void setSalario(Double salario) {
        this.salario = salario;
    }
    
    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }
    
    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
    
    public Rol getRol() {
        return rol;
    }
    
    public void setRol(Rol rol) {
        this.rol = rol;
    }
    
    // ========== EQUALS Y HASHCODE ==========
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
    
    // ========== TOSTRING ==========
    
    @Override
    public String toString() {
        return "Usuario{" +
                "id=" + id +
                ", nombre='" + nombre + '\\'' +
                ", email='" + email + '\\'' +
                ", edad=" + edad +
                ", activo=" + activo +
                ", rol=" + rol +
                '}';
    }
}

/*
SQL generado por JPA:

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    edad INT,
    activo BOOLEAN DEFAULT true,
    salario DECIMAL(10,2),
    fecha_nacimiento DATE,
    fecha_registro DATETIME,
    descripcion TEXT,
    foto BLOB,
    rol VARCHAR(20),
    creado_en DATETIME,
    actualizado_en DATETIME,
    creado_por VARCHAR(255),
    actualizado_por VARCHAR(255)
);
*/`,
      explanation: "@Entity marca una clase como entidad JPA. @Table especifica el nombre de tabla. @Id marca la clave primaria, @GeneratedValue define cómo se genera (IDENTITY, SEQUENCE, TABLE, AUTO). @Column personaliza columnas (name, nullable, length, unique, precision, scale). @Lob para campos grandes (TEXT, BLOB). @Enumerated para enums (STRING recomendado sobre ORDINAL). @Transient excluye campos de persistencia. Los callbacks (@PrePersist, @PostPersist, @PreUpdate, @PostUpdate, @PreRemove, @PostRemove, @PostLoad) ejecutan lógica en eventos del ciclo de vida. Siempre implementa equals() y hashCode() basados en ID."
    },
    {
      title: "Relaciones JPA - OneToMany y ManyToOne",
      description: "Mapeo de relaciones entre entidades",
      code: `// RELACIONES JPA - ONETOMANY Y MANYTOONE

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

// ========== LADO "UNO" (PADRE) ==========

@Entity
@Table(name = "departamentos")
public class Departamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String nombre;
    
    @Column(length = 500)
    private String descripcion;
    
    // OneToMany: Un departamento tiene muchos empleados
    @OneToMany(
        mappedBy = "departamento",  // Campo en Empleado que mapea esta relación
        cascade = CascadeType.ALL,   // Operaciones en cascada
        orphanRemoval = true,        // Elimina huérfanos
        fetch = FetchType.LAZY       // Carga perezosa (default)
    )
    private List<Empleado> empleados = new ArrayList<>();
    
    // Métodos de conveniencia para mantener sincronización bidireccional
    public void agregarEmpleado(Empleado empleado) {
        empleados.add(empleado);
        empleado.setDepartamento(this);
    }
    
    public void removerEmpleado(Empleado empleado) {
        empleados.remove(empleado);
        empleado.setDepartamento(null);
    }
    
    // Constructor, getters, setters
    public Departamento() {}
    
    public Departamento(String nombre) {
        this.nombre = nombre;
    }
    
    public Long getId() {
        return id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public List<Empleado> getEmpleados() {
        return empleados;
    }
}

// ========== LADO "MUCHOS" (HIJO) ==========

@Entity
@Table(name = "empleados")
public class Empleado {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(precision = 10, scale = 2)
    private Double salario;
    
    // ManyToOne: Muchos empleados pertenecen a un departamento
    @ManyToOne(
        fetch = FetchType.LAZY,      // Carga perezosa (default)
        optional = false             // No puede ser null
    )
    @JoinColumn(
        name = "departamento_id",    // Nombre de FK en tabla empleados
        nullable = false,
        foreignKey = @ForeignKey(name = "fk_empleado_departamento")
    )
    private Departamento departamento;
    
    // Constructor, getters, setters
    public Empleado() {}
    
    public Empleado(String nombre, String email, Double salario) {
        this.nombre = nombre;
        this.email = email;
        this.salario = salario;
    }
    
    public Long getId() {
        return id;
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
    
    public Double getSalario() {
        return salario;
    }
    
    public void setSalario(Double salario) {
        this.salario = salario;
    }
    
    public Departamento getDepartamento() {
        return departamento;
    }
    
    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }
    
    @Override
    public String toString() {
        return "Empleado{" +
                "id=" + id +
                ", nombre='" + nombre + '\\'' +
                ", email='" + email + '\\'' +
                ", salario=" + salario +
                '}';
    }
}

// ========== TIPOS DE CASCADE ==========

/*
CascadeType.PERSIST: Al persistir padre, persiste hijos
CascadeType.MERGE: Al hacer merge de padre, hace merge de hijos
CascadeType.REMOVE: Al eliminar padre, elimina hijos
CascadeType.REFRESH: Al refrescar padre, refresca hijos
CascadeType.DETACH: Al detach padre, detach hijos
CascadeType.ALL: Todas las anteriores
*/

// ========== FETCH TYPES ==========

/*
FetchType.LAZY (recomendado):
- Carga la relación solo cuando se accede
- Evita N+1 queries
- Mejor rendimiento

FetchType.EAGER:
- Carga la relación inmediatamente
- Puede causar problemas de rendimiento
- Usar solo cuando siempre necesitas los datos relacionados
*/

// ========== EJEMPLO DE USO ==========

class EjemploUso {
    
    public void ejemploCreacion(EntityManager em) {
        // Crear departamento
        Departamento ventas = new Departamento("Ventas");
        ventas.setDescripcion("Departamento de ventas");
        
        // Crear empleados
        Empleado emp1 = new Empleado("Ana García", "ana@empresa.com", 35000.0);
        Empleado emp2 = new Empleado("Juan Pérez", "juan@empresa.com", 40000.0);
        Empleado emp3 = new Empleado("María López", "maria@empresa.com", 38000.0);
        
        // Establecer relaciones (método recomendado)
        ventas.agregarEmpleado(emp1);
        ventas.agregarEmpleado(emp2);
        ventas.agregarEmpleado(emp3);
        
        // Persistir (con cascade, persiste empleados también)
        em.getTransaction().begin();
        em.persist(ventas);
        em.getTransaction().commit();
        
        System.out.println("Departamento creado con " + ventas.getEmpleados().size() + " empleados");
    }
    
    public void ejemploConsulta(EntityManager em) {
        // Buscar departamento
        Departamento dept = em.find(Departamento.class, 1L);
        
        System.out.println("Departamento: " + dept.getNombre());
        
        // Acceder a empleados (se carga con LAZY)
        System.out.println("Empleados:");
        for (Empleado emp : dept.getEmpleados()) {
            System.out.println("  - " + emp.getNombre() + ": $" + emp.getSalario());
        }
    }
    
    public void ejemploActualizacion(EntityManager em) {
        em.getTransaction().begin();
        
        // Buscar empleado
        Empleado emp = em.find(Empleado.class, 1L);
        
        // Actualizar salario
        emp.setSalario(emp.getSalario() * 1.1); // Aumento del 10%
        
        // No es necesario llamar a em.merge() si la entidad está managed
        
        em.getTransaction().commit();
    }
    
    public void ejemploEliminacion(EntityManager em) {
        em.getTransaction().begin();
        
        Departamento dept = em.find(Departamento.class, 1L);
        
        // Con orphanRemoval=true y cascade=ALL, elimina empleados también
        em.remove(dept);
        
        em.getTransaction().commit();
    }
    
    public void ejemploRemoverEmpleado(EntityManager em) {
        em.getTransaction().begin();
        
        Departamento dept = em.find(Departamento.class, 1L);
        Empleado emp = dept.getEmpleados().get(0);
        
        // Remover empleado del departamento
        dept.removerEmpleado(emp);
        
        // Con orphanRemoval=true, el empleado se elimina de BD
        
        em.getTransaction().commit();
    }
}

/*
SQL generado:

CREATE TABLE departamentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    descripcion VARCHAR(500)
);

CREATE TABLE empleados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    salario DECIMAL(10,2),
    departamento_id BIGINT NOT NULL,
    CONSTRAINT fk_empleado_departamento 
        FOREIGN KEY (departamento_id) 
        REFERENCES departamentos(id)
);
*/`,
      explanation: "@OneToMany mapea el lado 'uno' (padre), @ManyToOne mapea el lado 'muchos' (hijo). mappedBy indica el campo en la entidad hija que posee la relación. @JoinColumn especifica la columna de clave foránea. cascade controla operaciones en cascada (PERSIST, MERGE, REMOVE, REFRESH, DETACH, ALL). orphanRemoval=true elimina entidades hijas huérfanas. FetchType.LAZY carga bajo demanda (recomendado), EAGER carga inmediatamente. Siempre usa métodos de conveniencia para mantener sincronización bidireccional. El lado @ManyToOne es el dueño de la relación (tiene la FK)."
    },
    {
      title: "Relaciones ManyToMany y OneToOne",
      description: "Relaciones muchos a muchos y uno a uno en JPA",
      code: `// RELACIONES MANYTOMANY Y ONETOONE

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

// ========== MANYTOMANY - ESTUDIANTE Y CURSO ==========

@Entity
@Table(name = "estudiantes")
public class Estudiante {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false, unique = true)
    private String matricula;
    
    // ManyToMany: Muchos estudiantes pueden tomar muchos cursos
    @ManyToMany(
        cascade = {CascadeType.PERSIST, CascadeType.MERGE},
        fetch = FetchType.LAZY
    )
    @JoinTable(
        name = "estudiante_curso",              // Tabla intermedia
        joinColumns = @JoinColumn(name = "estudiante_id"),  // FK a esta entidad
        inverseJoinColumns = @JoinColumn(name = "curso_id") // FK a otra entidad
    )
    private Set<Curso> cursos = new HashSet<>();
    
    // Métodos de conveniencia
    public void inscribirCurso(Curso curso) {
        cursos.add(curso);
        curso.getEstudiantes().add(this);
    }
    
    public void desinscribirCurso(Curso curso) {
        cursos.remove(curso);
        curso.getEstudiantes().remove(this);
    }
    
    // Constructor, getters, setters
    public Estudiante() {}
    
    public Estudiante(String nombre, String matricula) {
        this.nombre = nombre;
        this.matricula = matricula;
    }
    
    public Long getId() {
        return id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getMatricula() {
        return matricula;
    }
    
    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }
    
    public Set<Curso> getCursos() {
        return cursos;
    }
}

@Entity
@Table(name = "cursos")
public class Curso {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false, unique = true)
    private String codigo;
    
    @Column
    private Integer creditos;
    
    // Lado inverso de ManyToMany
    @ManyToMany(mappedBy = "cursos")
    private Set<Estudiante> estudiantes = new HashSet<>();
    
    // Constructor, getters, setters
    public Curso() {}
    
    public Curso(String nombre, String codigo, Integer creditos) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.creditos = creditos;
    }
    
    public Long getId() {
        return id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getCodigo() {
        return codigo;
    }
    
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    
    public Integer getCreditos() {
        return creditos;
    }
    
    public void setCreditos(Integer creditos) {
        this.creditos = creditos;
    }
    
    public Set<Estudiante> getEstudiantes() {
        return estudiantes;
    }
}

// ========== ONETOONE - USUARIO Y PERFIL ==========

@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    // OneToOne: Un usuario tiene un perfil
    @OneToOne(
        mappedBy = "usuario",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    private Perfil perfil;
    
    // Método de conveniencia
    public void setPerfil(Perfil perfil) {
        if (perfil == null) {
            if (this.perfil != null) {
                this.perfil.setUsuario(null);
            }
        } else {
            perfil.setUsuario(this);
        }
        this.perfil = perfil;
    }
    
    // Constructor, getters, setters
    public Usuario() {}
    
    public Usuario(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
    public Long getId() {
        return id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Perfil getPerfil() {
        return perfil;
    }
}

@Entity
@Table(name = "perfiles")
public class Perfil {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(length = 500)
    private String bio;
    
    @Column
    private String avatar;
    
    @Column(name = "fecha_nacimiento")
    private java.time.LocalDate fechaNacimiento;
    
    // OneToOne: Un perfil pertenece a un usuario
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "usuario_id",
        referencedColumnName = "id",
        nullable = false,
        unique = true
    )
    private Usuario usuario;
    
    // Constructor, getters, setters
    public Perfil() {}
    
    public Perfil(String bio) {
        this.bio = bio;
    }
    
    public Long getId() {
        return id;
    }
    
    public String getBio() {
        return bio;
    }
    
    public void setBio(String bio) {
        this.bio = bio;
    }
    
    public String getAvatar() {
        return avatar;
    }
    
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    
    public java.time.LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }
    
    public void setFechaNacimiento(java.time.LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}

// ========== MANYTOMANY CON ATRIBUTOS ADICIONALES ==========

// Cuando necesitas atributos en la tabla intermedia,
// debes crear una entidad para la relación

@Entity
@Table(name = "inscripciones")
public class Inscripcion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "estudiante_id")
    private Estudiante estudiante;
    
    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;
    
    @Column(name = "fecha_inscripcion")
    private java.time.LocalDate fechaInscripcion;
    
    @Column
    private Double calificacion;
    
    @Column(length = 20)
    private String estado; // ACTIVO, COMPLETADO, ABANDONADO
    
    // Constructor, getters, setters
    public Inscripcion() {}
    
    public Inscripcion(Estudiante estudiante, Curso curso) {
        this.estudiante = estudiante;
        this.curso = curso;
        this.fechaInscripcion = java.time.LocalDate.now();
        this.estado = "ACTIVO";
    }
    
    // Getters y setters...
}

/*
SQL generado para ManyToMany:

CREATE TABLE estudiantes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    matricula VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE cursos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    codigo VARCHAR(255) NOT NULL UNIQUE,
    creditos INT
);

CREATE TABLE estudiante_curso (
    estudiante_id BIGINT NOT NULL,
    curso_id BIGINT NOT NULL,
    PRIMARY KEY (estudiante_id, curso_id),
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

SQL generado para OneToOne:

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE perfiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bio VARCHAR(500),
    avatar VARCHAR(255),
    fecha_nacimiento DATE,
    usuario_id BIGINT NOT NULL UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
*/`,
      explanation: "@ManyToMany mapea relaciones muchos-a-muchos usando tabla intermedia. @JoinTable especifica la tabla intermedia con joinColumns (FK a esta entidad) e inverseJoinColumns (FK a otra entidad). Usa Set en lugar de List para evitar duplicados. @OneToOne mapea relaciones uno-a-uno. El lado con @JoinColumn es el dueño (tiene la FK). mappedBy indica el lado inverso. Para ManyToMany con atributos adicionales, crea una entidad intermedia con dos @ManyToOne. Siempre usa métodos de conveniencia para mantener sincronización bidireccional. unique=true en @JoinColumn asegura la relación uno-a-uno."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">JPA y Entidades</h1>
        <p className="text-lg text-gray-600 mb-6">
          Mapeo objeto-relacional con JPA: entidades, relaciones y persistencia de datos.
        </p>
        
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-indigo-700">
                <strong>JPA (Java Persistence API):</strong> Es el estándar de Java para mapeo objeto-relacional (ORM).
                Permite trabajar con bases de datos usando objetos Java en lugar de SQL directo.
                Hibernate es la implementación más popular de JPA.
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

      <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Mejores prácticas JPA:</strong> Usa FetchType.LAZY por defecto, implementa equals/hashCode
              basados en ID, usa métodos de conveniencia para relaciones bidireccionales, evita
              CascadeType.REMOVE en ManyToMany, usa Set para ManyToMany, y siempre cierra EntityManager.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JPAEntities;
