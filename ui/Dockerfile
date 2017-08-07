FROM sjd300671/minimal-java 
VOLUME /tmp 
EXPOSE 8080 
ADD target/smartdeployng-ui-web-0.1.0.jar app.jar
ADD wait-for-it.sh wait-for-it.sh  
RUN sh -c 'touch /app.jar' 
ENV JAVA_OPTS=""
ENV SPRING_OPTS=""  
ENTRYPOINT [ "./wait-for-it.sh", "smartdeployng_configuration:8080", "--", "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar $SPRING_OPTS" ]
