import React from 'react'

function withLogging(WrappedComponent: React.ComponentType): React.ComponentType | null {
    const logger = {
      info(...args: any[]) {
        console.log("[INFO]", ...args);
      }
    };
  
    return class extends React.Component {
      componentDidMount() {
        logger.info("component mounted", WrappedComponent);
      }
  
      render() {
        logger.info("component rendered", WrappedComponent);
        return <WrappedComponent {...this.props} />;
      }
    };
  }

  export default withLogging;