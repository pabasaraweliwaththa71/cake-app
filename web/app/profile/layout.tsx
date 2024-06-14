// This component takes 'children' as a prop
// 'children' is of type React.ReactNode, which can be any valid React child element

export default function Layout({ children }: { children: React.ReactNode }) {
// The 'children' prop is rendered inside this div
    return <div className="px-16 pt-1">{children}</div>;
  }
  