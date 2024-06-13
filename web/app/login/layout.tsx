// Importing the default function for the layout component
export default function Layout({ children }: { children: React.ReactNode }) {
   
    // 'children' is a prop that allows nested components to be rendered inside this layout
    return <div className="px-16 pt-1">{children}</div>;
  }
  