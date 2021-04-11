import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"
import spec from './swagger.json'
function DocumentationPage() {
    return (
        <div className="documentation-page">
            <SwaggerUI spec={spec}/>
        </div>
    );
  }

export default DocumentationPage;