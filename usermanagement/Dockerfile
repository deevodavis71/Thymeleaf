FROM sjd300671/minimal-java 
VOLUME /tmp 
EXPOSE 10000 
ADD target/smartdeployng-usermanagement-web-0.1.0.jar app.jar
ADD wait-for-it.sh wait-for-it.sh  
RUN sh -c 'touch /app.jar' 
ENV JAVA_OPTS=""
ENV SPRING_OPTS=""  
ENTRYPOINT [ "./wait-for-it.sh", "smartdeployng_configuration:8888", "--", "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar $SPRING_OPTS" ]