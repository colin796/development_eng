import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PhoneForm from './component/PhoneForm'
import PhoneInfoList from './component/PhoneInfoList'

// function App() {
//   return (
//     <div>
//       <PhoneForm />
//     </div>
//   );
// }


class App extends Component {
  id = 2 // 내부에서 렌더링되는 것과 상관없을 경우 state를 굳이 할 필요가 없음
  state = {
    information: [
      {
        id:0,
        name:'김민준',
        phone:'010-0000-0000'
      },
      {
        id:1,
        name:'홍길동',
        phone:'010-0000-0001'
      },
    ]
  }
  
  
  // state값을 부모 컴포넌트에 전달해주기 위해
  //  -> 부모 컴포넌트에서 메소드를 만들고, 이 메소드를 자식에세 전달한 다음 자식 내부에서 호출
  //  -> submit이 자식에서 발생하면 props로 받은 함수를 호출 > App에서 파라미터로 받아서 쓸 수 있도록
  handleCrate = (data) => {
    const { information } = this.state; // state를 qkedma
    this.setState({
      // information 객체에 id: this.id++ 해서 추가하고 나머지 부분은 매개변수로 받아온 data를 그대로 넣겠다는 의미 (https://sovovy.tistory.com/34)
      information : information.concat({id:this.id++, ...data})
    })
    console.log(data);
  }
  

  render() {
    const { information } = this.state;
    return (
      <div>
        {/* 1) PhoneForm을 우선 호출 */}
        <PhoneForm 
          onCreate={this.handleCrate}
        />
        {/* {JSON.stringify(information)} */}

        {/* 2) PhoneInfoList을 2번으로 호출 */}
        <PhoneInfoList data={this.state.information}/>
      </div>
    );
  }
}

export default App;
