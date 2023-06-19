# 화이트보드 기능 구현

- 'react-konva' 라이브러리 사용하여 캔버스 기반의 화이트보드 구현
- 화이트보드 내 ToolBar는 피그마 디자인 확인하여 진행<br>
- [DEMO](https://white-board-ten.vercel.app/)
  <br>
  ![image](https://github.com/yoyoujin/white-board/assets/102464638/a97d9846-84e2-4db9-8e75-9ad4b2922d14)

## :: [Konva Demo](https://konvajs.org/docs/react/Free_Drawing.html) 분석

- lines 배열은 선 객체가 직접 저장된다.
- 선이 그려질 때마다 setLines를 호출하여 lines 배열 전체를 갱신한다.
- 매번 새로운 배열을 생성하여 이전의 lines와 병합한다.
- 선의 추가 및 갱신 시 -> 배열의 복사와 병합이 필요하여 성능에 영향을 미칠 것이다💩
- 선을 그리는 동안 실시간으로 좌표 값이 변하기 때문에(리렌더링이 일어남) 이미 그려진 선들은 불필요한 렌더링이 진행되게 된다. 💩
- 또한 실시간으로 그려지는 선의 특성상, 그리는 동안 존재하는 임시데이터이자 실시간으로 변경되는 데이터이기에 따로 관리하는 것이 데이터 관리 측면에서도 안전할 것이라고 생각하엿다.

- 선의 좌표값들을 실시간으로 전송해야하고,
  성능을 고려한다면 다른 구조로 코드를 작성해야겠다고 결정하였다.

👉 `그려진 선들이 저장되는 배열`-
`현재 그려지는 선이 저장되는 배열`을 분리하게된다.
<br> <br>

## :: 구현사항

### 1. 캔버스 기반의 화이트보드 free drawing

- 현재 그려지는 선은 `currentLine` 배열에 저장되고, 그리기가 완료되면(마우스 클릭을 떼면) 현재 선을 `lines` 배열에 합쳐준다. 이 때 `currentLine`은 초기화된다.
- 선의 추가 및 갱신 시 -> 배열의 복사와 병합이 필요하지 않다.
- `lines` 배열에는 선 객체의 참조가 저장되기 때문에 상대적으로 가변성이 낮고, 성능상 이점이 생긴다 ✨

<br>

### 2. ToolBar

- 펜툴 : 펜 선택한 경우, 선 굵기와 색상을 설정할 수 있는 사이드바가 표시됩니다.
- 지우개툴: 사용자가 마우스를 클릭하고 클릭을 뗀 지점까지 적용되어있는 굵기로 지워집니다.
- Undo: lines 상태에서 마지막 선을 제거합니다. 제거한 선은 undoneItem 상태에 저장합니다.
- Redo: undoneItem 상태에 저장된 마지막 선을 다시 추가합니다.
  <br><br>

## :: 고민

1. 삽질기록 블로그글 - [화이트보드, 그 여정과 새싹톤 도전기](https://velog.io/@yjinhann/React-Konva-%ED%99%94%EC%9D%B4%ED%8A%B8%EB%B3%B4%EB%93%9C-%EA%B7%B8-%EC%97%AC%EC%A0%95)

1. Undo / Redo

- Undo 버튼을 클릭하면 lines 에서 가장 마지막 배열이 제거되고, undoneItem으로 추가된다.
- Redo 버튼을 클릭하면 undoneItem의 배열이 제거되고, lines로 추가가된다.
  현재는 한 단계식 가능하도록 구현하였지만 여러단계 undo, redo 기능 사용 가능하도록 수정할지

2. Eraser 기능

- 이미지와 같이, eraser 툴을 선택후 마우스를 드래그하거나 터치를 하면 해당 영역의 선이 지워집니다.
  따라서 eraser 선의 상태도 lines에 저장됩니다.
  (mode: 'eraser' / 펜툴의 경우 mode: 'pen' 으로 저장됨)
- eraser 기능이 현재 구현한 방향이 맞을지, 해당 툴 클릭시 전체가 지워지는 기능으로 수정 또는 추가가 필요할지 고민입니다.

<br>

## :: 기타

1. 사용자가 툴을 선택하지 않을 경우, default 값으로는 아래와 같이 설정하였습니다.

- mode: pen
- stroke color: #000000
- stroke width: light(5)

2. 디자인 상으로 stroke 굵기가 3개 존재하여, 현재는 임의로 설정하였습니다. (5, 10, 15)
   stroke 굵기의 경우 디자이너분과 상의해서 최종 굵기를 적용 예정입니다.

- default 굵기는 5 입니다.
- stroke width 에 따라 지우개 툴의 width 도 동일하게 적용됩니다.
