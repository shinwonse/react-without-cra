# React-without-CRA
## 1. CRA로 만든 리액트 개발 환경
- React, JSX, ES6, TypeScript, [Flow](https://flow.org/) 문법 지원
- spread operator와 같은 ES6+ 문법 지원
- Autoprefixed CSS 지원 [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- live development server 지원
- JS, CSS, 이미지 번들 지원 (with hashes and sourcemaps)
> [create-react-app](https://github.com/facebook/create-react-app)

## 2. CRA 없이 리액트 개발 환경 만들기 (with Webpack)
### 2.1. Webpack 설치
`npm install -D webpack webpack-cli`
### 2.2. Webpack 설정 파일 생성
`touch webpack.config.js`
```javascript
module.exports = {
  
}
```
### 2.3. Webpack 설정
**Output**
```javascript
module.exports = {
  output: {
    filename: 'index.js',
  },
}
```
리액트 프로젝트의 경우 컴포넌트를 import하는 상위 컴포넌트를 따라 올라가다보면 결국 VDOM과 root div를 연결해주는 index.js 파일을 만나게 된다. 

그래서 Webpack 설정에서 output의 filename을 index.js로 따로 설정해준다. 이렇게 설정하면 Webpack이 번들링을 하고 나면 dist 폴더에 index.js 파일이 생성된다.

**Loaders**
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
}
```
Webpack은 기본적으로 JS 파일만 번들링할 수 있다. 그래서 JSX, ES6+ 문법을 사용하려면 Babel을 사용해야 한다. 
- **@babel-core**는 코드 변환과 관련된 API를 지닌 패키지
- **@babel/preset-env**는 ES6+ 문법을 ES5로 변환해주는 플러그인의 모음
- **@babel/preset-react**는 React, JSX 문법을 JS로 변환해주는 플러그인의 모음

**Assets**
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
    ]
  }
}
```
[Asset Modules](https://webpack.kr/guides/asset-modules/) 가이드를 따라 작성하였다. 주로 svg 파일은 인라인 방식을 채택하고, png 파일은 파일 방식을 채택한다. 이에 대해서는 따로 정리해보도록 한다.

**Plugins**
```javascript
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```
**live development server**를 지원하기 위해서 **HtmlWebpackPlugin**을 사용한다.
## 3. 결과
지금까지의 웹팩 세팅에 의한 번들링 결과는 아래와 같다.

<img width="240" alt="스크린샷 2022-11-23 오전 12 48 35" src="https://user-images.githubusercontent.com/62709718/203359489-324fcd34-5760-4ea1-b893-540246862a61.png">

dist 폴더의 index.html 파일을 실행해보면 정상적으로 작동하는 것을 확인할 수 있다.

---
**참고**
- [Webpack](https://webpack.js.org/)
- [babel](https://babeljs.io/)
- [create-react-app](https://github.com/facebook/create-react-app)
- [웹팩을 활용한 리액트 개발 환경 세팅](https://dinn.github.io/web/webpack-01/)
