# 이웃끼리 거래하자 - 위치 기반 거래 플랫폼 :: 이웃사촌

![good1](https://user-images.githubusercontent.com/71423455/199411357-bb809a41-be6f-4cc7-a327-13c0621736a9.png)

## 프로젝트 소개
* K-Digital Training 웹 풀스택 과정 2차 프로젝트를 통해 진행한 팀프로젝트입니다. 
* 야채,과일을 나눔,교환하는 사이트를 제작했으며, 총 4명이 2022.08.15 ~ 2022.08.29( 2주간 ) 개발을 진행하였습니다.
* HTML, CSS, JavaScript, Git, Node.js, Express

## 페이지 설계
< 이웃사촌 설계 >

전체적인 UI/UX, 메인 컬러 디자인
모든 페이지에 반응형 페이지 적용

## 구현 기능
> 메인 화면
* SVG를 활용해 스크롤에 따라 drawing으로 완성 되는 메인화면 구현

> 회원 가입 페이지
* Kakao API를 통한 위치 기반 가입 서비스
* RegEx를 적용한 유효성 검사

> 상품 페이지
* 저장된 지역(동네)의 위치 정보에 따라 같은 지역의 상품만 화면에 표시
* 광고 캐러셀 구현
* 상품 정보 썸네일 

> 상품 업로드 페이지
* 거래할 상품의 거래 조건 선택 메뉴 구현

> 상품 상세 페이지
* 업로드한 제품의 사진 개수가 1개 이상일 경우 캐러셀과 인디케이터 생성  
* 제품의 상세 정보 표기 - (가격, 업로드 시간, 거래방식)
* 찜 기능 구현

> 내 정보 보기 페이지
* 내가 찜한 목록 확인
* 회원 탈퇴 

> 1:1 거래 (채팅)
* Socket.io를 활용해 채팅 구현

> 클라우드 서버 구축
* 네이버 클라우드 플랫폼을 이용해 웹 서버를 구축
