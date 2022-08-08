import useAuth from '../customHooks/useAuth'

const WithAuth = props => useAuth() && props.children;

export default WithAuth;

