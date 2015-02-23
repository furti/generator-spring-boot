package <%= basePackage %>;

import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * We import the AppConfig so we can use it as entry point when we deploy the war in a Servlet Container.
 * In an embedded configuration we simply start the application class.
 */
@Configuration
@Import(${ appClass }Config.class)
public class ${ appClass }Application {
  public static void main(String[] args) {
    SpringApplication.run(${ appClass }Application.class, args);
  }
}
