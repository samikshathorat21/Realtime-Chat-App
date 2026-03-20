# Stage 1: Build the Spring Boot application using Maven
FROM eclipse-temurin:21-jdk-focal AS builder

WORKDIR /app

# Copy pom.xml and download dependencies (better caching)
COPY pom.xml .

RUN apt-get update && apt-get install -y maven

RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build jar
RUN mvn clean package -DskipTests

# Stage 2: Runtime image
FROM eclipse-temurin:17-jre-focal

WORKDIR /app

# Copy jar from builder
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "app.jar"]
