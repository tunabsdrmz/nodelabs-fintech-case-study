interface BlankLayoutProps {
  children: React.ReactNode;
}

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <div
      id="layout-wrapper"
      className="relative w-full h-full min-h-screen overflow-x-hidden bg-ftBackground">
      {children}
    </div>
  );
};

export default BlankLayout;
