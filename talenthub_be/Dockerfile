# syntax=docker/dockerfile:1

# Build the Spring Boot executable JAR with the same Java/Maven major versions
# used by the project: Java 21 and Maven 3.9.x.
FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /app

# Copy the build descriptor first so Docker can reuse the dependency layer.
COPY pom.xml ./
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B clean package -DskipTests

# Keep the runtime image smaller than the build image and do not run as root.
FROM eclipse-temurin:21-jre-jammy AS runtime

WORKDIR /app

RUN groupadd --system spring && useradd --system --gid spring spring

COPY --from=build /app/target/*.jar app.jar

USER spring

EXPOSE 10000

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]
