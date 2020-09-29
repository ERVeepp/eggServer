<html>
  <head>
    <title>home</title>
  </head>
  <body>
    <li>{{ __('Email') }}: {{ user.email }}</li>
    <li>
      {{ __('Welcome back, %s!', user.name) }}
    </li>
    <li>
      {{ __('Hello {0}! My name is {1}.', ['foo', 'bar']) }}
    </li>
  </body>
</html>