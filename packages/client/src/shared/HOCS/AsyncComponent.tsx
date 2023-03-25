import React, { Component } from 'react'
import { Spin } from 'antd'

interface IState {
  component: React.ComponentType | null;
}

type DynamicImportType = () => Promise<{ default: React.ComponentType }>

const AsyncComponent = (importComponent: DynamicImportType) => class extends Component {
  state: IState = {
    component: null,
  };

  componentDidMount() {
    importComponent().then((cmp) => {
      this.setState({ component: cmp.default });
    });
  }

  render() {
    const { component: LoadedComponent } = this.state;

    return LoadedComponent ? (
      <LoadedComponent {...this.props} />
    ) : (
      <Spin tip="Loading" size="large" />
    );
  }
}

export default AsyncComponent
