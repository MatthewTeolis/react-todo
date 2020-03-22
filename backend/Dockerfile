FROM ruby:2.5

WORKDIR /app

COPY Gemfile Gemfile.lock /app/

RUN bundle install

COPY . /app

RUN rm -f /app/tmp/pids/server.pid

EXPOSE 5000/tcp

CMD ["rails", "server", "-b", "0.0.0.0", "-p", "5000" ]