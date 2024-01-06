import MyThemeProvider from './theme/theme';
import Router from './routes/section';
import { useState } from 'react';
function App() {
  
  return (
    <MyThemeProvider>
      <Router/>
    </MyThemeProvider>
  );
}

export default App;
