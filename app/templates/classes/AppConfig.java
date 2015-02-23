package <%= basePackage %>;

import org.springframework.boot.autoconfigure.SpringBootApplication;
<% if(registerJacksonDateModule) { %>
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.LocalDateTime;

import <%= basePackage %>.util.LocalDateDeserializer;
import <%= basePackage %>.util.LocalDateSerializer;
import <%= basePackage %>.util.LocalDateTimeDeserializer;
import <%= basePackage %>.util.LocalDateTimeSerializer;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.module.SimpleModule;

<% } %>

@SpringBootApplication
public class ${ appClass }Config {
  <% if(registerJacksonDateModule) { %>
  	/**
  	 * Register a Jackson module that defines serializers and deserializers for
  	 * ISO 8601 Dates
  	 *
  	 * @return Jackson module
  	 */
  	@Bean
  	public Module dateModule() {
  		SimpleModule dateModuel = new SimpleModule(
  				"Boottest",
  				new Version(1, 0, 0, null, "at.furti", "boot"));

  		dateModuel.addSerializer(new LocalDateSerializer());
  		dateModuel.addDeserializer(LocalDate.class, new LocalDateDeserializer());
  		dateModuel.addSerializer(new LocalDateTimeSerializer());
  		dateModuel.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer());

  		return dateModuel;
  	}<% } %>
}
