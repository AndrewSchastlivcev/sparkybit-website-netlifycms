import React from "react";
import Img from "gatsby-image";
import rehypeReact from "rehype-react";

const RehypedImg = props => <Img {...props} />;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "image-to-rehype": RehypedImg
  }
}).Compiler;

const hasASTContent = ast => ast.children.length > 0;

export default ({ ast }) => (hasASTContent(ast) ? renderAst(ast) : null);
export { hasASTContent };