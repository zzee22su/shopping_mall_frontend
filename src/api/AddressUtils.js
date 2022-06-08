export default {
getAddress(cb) {
    let inputAddress;
    let extraAddress;
    var address = {};

        new window.daum.Postcode({
         oncomplete: (data) => {
           if (data.userSelectedType === "R") {
             // 사용자가 도로명 주소를 선택했을 경우
             inputAddress = data.roadAddress;
           } else {
             // 사용자가 지번 주소를 선택했을 경우(J)
             inputAddress = data.jibunAddress;
           }
           console.log("주소" + inputAddress);
           address.addr = inputAddress;
  
            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
           if (data.userSelectedType === "R") {
             // 법정동명이 있을 경우 추가한다. (법정리는 제외)
             // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
             if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
               extraAddress += data.bname;
             }
             // 건물명이 있고, 공동주택일 경우 추가한다.
             if (data.buildingName !== "" && data.apartment === "Y") {
               extraAddress +=
                 extraAddress !== ""
                   ? `, ${data.buildingName}`
                   : data.buildingName;
             }
             // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
             if (extraAddress !== "") {
               extraAddress = `(${extraAddress})`;
             }
           } else {
             extraAddress = "";
           }
           address.extadadr = extraAddress;
           console.log("상세주소" + extraAddress);
           // 우편번호를 입력한다.
           let postcodenumber = data.zonecode;
           console.log("우편번호" + postcodenumber);
           address.postNum = postcodenumber;

           console.log(address);
           cb(address);
         },
       }).open();
    }
}