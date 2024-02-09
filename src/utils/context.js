import {hooks} from '../utils/'
function ContextContainer({ children }) {
  return <hooks.ProvideAuth>{children}</hooks.ProvideAuth>;

}

export default ContextContainer;
