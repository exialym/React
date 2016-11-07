import React ,{Component}from 'react'
//Filter子组件
const Link = ({active,children,onClick}) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a href="#" onClick={e => {
      e.preventDefault();
      onClick();
    }}>
      {children}
    </a>
  )
};
//Filter容器，以便state参数不用从顶一直传到这里
class FilterLink extends Component {
  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const {store} = this.context;
    const state = store.getState();
    return (
      <Link
        active={
          props.filter===state.visibilityFilter
        }
        onClick={() => {
          store.dispatch({
            type:'SET_FILTER',
            filter:props.filter,
          })
        }}
      >
        {props.children}
      </Link>
    )
  }
}
FilterLink.contextTypes = {
  store: React.PropTypes.object
};
//Fliters子组件
const Footer = () => (
  <p>
    Show:{'  '}
    <FilterLink filter="SHOW_ALL">All</FilterLink>{'  '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{'  '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);
export default Footer;