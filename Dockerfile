FROM node:latest

MAINTAINER Hanyu Xiao, hxiao@tibco.com

WORKDIR /home/node

# Install Ruby.
RUN \
  apt-get update && \
  apt-get install -y ruby ruby-dev rubygems && \
  rm -rf /var/lib/apt/lists/*

# Install prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower
RUN gem install sass

# Install packages
ADD package.json /home/node/package.json
RUN npm install

# Run bower
ADD .bowerrc /home/node/.bowerrc
ADD bower.json /home/node/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/node

# Use the development mode
ENV NODE_ENV development

# Port 9000 for server
# Port 35729 for livereload
EXPOSE 9000 35729

CMD grunt serve