## ✍️프로젝트 소개
채팅방 프로젝트

## ⚙️개발환경
* nodejs(v 20.9.0)
* mysql (v 5.7)
* vscode
* socket.io (v 4.7.4)
* ejs

## 📲db설계
![Untitled](https://github.com/qhdlehfdl/chatting_rooms/assets/74577699/c8b67297-0585-4c9c-a9ce-3184a31ce3d9)

## 📺화면구성
![화면 캡처 2024-03-19 191237](https://github.com/qhdlehfdl/chatting_rooms/assets/74577699/66656401-0845-4b63-b612-4ba7afd7dc37)
![화면 캡처 2024-03-19 191907](https://github.com/qhdlehfdl/chatting_rooms/assets/74577699/f72134dd-b6e9-4087-8a7d-5e58517b9f81)
![화면 캡처 2024-03-19 191301](https://github.com/qhdlehfdl/chatting_rooms/assets/74577699/1addfdb7-4bc1-4d33-a1ad-8d3b8997d40d)
![화면 캡처 2024-03-19 191210](https://github.com/qhdlehfdl/chatting_rooms/assets/74577699/fa02789b-1225-49b5-a616-f538c9d773f3)
로그인 or 회원가입 -> 로그아웃 or 채팅방 화면 -> 채팅방 선택 화면 -> 채팅방 

## 로그인, 회원가입
* 회원가입 : 아이디, 패스워드
* 로그인 : db에서 아이디, 패스워드 맞으면 ok. 로그인했다면 세션에 user 정보(users.id, users.userId) 저장

## 채팅방
* 채팅방 생성 : roomName만 작성
* 채팅방 선택 화면 : db에서 rooms 가져와서 현재 만들어진 채팅방 띄움
* 채팅방 : 채팅방 선택했다면 db에서 채팅방 정보, 채팅내역 가져옴.
채팅방 처음 들어오면 '~~님이 입장했습니다.' 문구뜨고 tokens.token에 socket.id 저장.
처음 들어온지 판별 : db에서 users.id, rooms.roomId로 검색 -> 있으면 처음 들어온거X -> socket.id=db에 저장된 토큰으로 바꿔줌.
채팅방 나가면 나간사람이 보낸 메시지 삭제(다른사람들한테도 안보임).

## 후기
* socket.io는 emit과 on의 주고받기.
* html 템플릿으로 ejs를 사용함 -> 채팅내역이나 이런거 보내려고. ejs 사용하지않고 더 좋은 방법 없을까?
* mysql 이중문? -> select ~~ where id>=(select ~~ where ~~)
* 채팅방, 채팅 db 설계 어떻게 할 지 막막 -> 걍 일단 만들어보니 술술 잘됨 -> 일단 걍 하자.
* 비동기처리 : 콜백함수, async await 사용해봄 -> 동기, 비동기 공부해도 어떤 느낌인지 잘 안옴.

