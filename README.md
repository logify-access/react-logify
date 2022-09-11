# React Logify

## Sample Code

[Logify.id](https://logify.id) - Unlimited free authorization & authentication service

[Tutorial](https://logify.id/articles/react-logify-basic)

## Install package

`npm install react-logify`

## Setup env variable

Create `.env` file and store Logify Domain Key

```yaml
REACT_APP_LOGIFY_DOMAINKEY = YOUR_DOMAIN_KEY
```

## Import useLogify

```js
import useLogify from 'react-logify';
```

```js
const { user, onLogin, onLogout } = useLogify();
```

where type of `user` is

```ts
{
  id: string;
  profileId: string;
  name: string;
  pic: string;
  email: string;
  timezone: string;
  organization?:{
    id: string;
    name: string;
    logo: string;
    designation: string;
    staffId: string;
    internal: boolean;
  }
}
```

## To Initiate Login

```jsx
{
  !user.id && <button onClick={onLogin}>Login</button>;
}
```

## To Initiate Logout or Switch Persona

```jsx
{
  user.id && (
    <>
      <button onClick={onLogout}>Logout</button>
      <button onClick={onLogin}>Switch Persona</button>
    </>
  );
}
```
