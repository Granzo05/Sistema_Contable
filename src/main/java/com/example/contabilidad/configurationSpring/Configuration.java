package com.example.contabilidad.configurationSpring;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@org.springframework.context.annotation.Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = {"com.example.contabilidad.repositories"},
        entityManagerFactoryRef = "entityManagerFactory")
class Configuration {
}
