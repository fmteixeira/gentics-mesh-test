FROM elasticsearch:6.8.5
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD ["/docker-healthcheck.sh"]
# USER elasticsearch
COPY files /
RUN chmod -R 777 /usr/share/elasticsearch
