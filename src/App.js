import MyThemeProvider from './theme/theme';
import Router from './routes/section';

function App() {
  return (
    <MyThemeProvider>
      <Router />
    </MyThemeProvider>
  );
}

export default App;
