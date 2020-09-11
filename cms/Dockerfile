FROM adoptopenjdk/openjdk11:x86_64-alpine-jre-11.0.3_7
CMD [ "java", "-jar" , "mesh.jar" ]
COPY healthcheck.js /
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD node /healthcheck.js
RUN apk add --no-cache nodejs
ENV MESH_AUTH_KEYSTORE_PATH=/keystore/keystore.jks
ENV MESH_GRAPH_BACKUP_DIRECTORY=/backups
ENV MESH_GRAPH_DB_DIRECTORY=/graphdb
ENV MESH_PLUGIN_DIR=/plugins
ENV MESH_BINARY_DIR=/uploads
ENV JAVA_TOOL_OPTIONS="-Xms512m -Xmx512m -XX:MaxDirectMemorySize=256m -Dstorage.diskCache.bufferSize=256"

RUN mkdir /graphdb && \
    mkdir /uploads && \
    mkdir /backups && \
    mkdir /plugins && \
    mkdir /keystore && \
    mkdir /mesh/ && \
    mkdir /mesh/data

WORKDIR /mesh
RUN wget -q -O /mesh/mesh.jar https://maven.gentics.com/maven2/com/gentics/mesh/mesh-server/1.7.1/mesh-server-1.7.1.jar
COPY files /
