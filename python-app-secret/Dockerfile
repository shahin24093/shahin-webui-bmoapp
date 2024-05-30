FROM oraclelinux:8.7
LABEL name="shahin"
RUN yum install python3 -y
WORKDIR /bmo/shahin/
#creating and changing dir
COPY myapp.py .
CMD [ "python3","myapp.py" ]