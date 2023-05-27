# 화이트보드 기능 구현

- 'react-konva' 라이브러리 사용하여 캔버스 기반의 화이트보드 구현
- 화이트보드 내 ToolBar는 완성된 피그마 디자인 확인하여 진행하였습니다.
  <br>
  ![image](https://github.com/yoyoujin/white-board/assets/102464638/a97d9846-84e2-4db9-8e75-9ad4b2922d14)

## :: 구현사항

### 1. 캔버스 기반의 화이트보드 free drawing

- 사용자가 마우스를 움직이거나 터치하면 handleMouseMove 함수가 호출되어 현재 선을 그립니다. 그리는 동안의 위치는 currentLine 상태에 저장됩니다.
- 사용자가 마우스 버튼을 누르면 handleMouseDown 함수가 호출되어 그리기가 시작됩니다. 시작 위치와 선택한 모드 (펜 또는 지우개)는 currentLine에 저장됩니다.
- 사용자가 마우스 버튼을 놓으면 handleMouseUp 함수가 호출되어 그리기가 종료됩니다. 현재 선은 lines 상태에 추가되고, currentLine은 초기화됩니다.
- lines 에는 pen툴로 그려진 선들과, eraser툴로 지워진 선들이 배열로 저장됩니다.

<br>

### 2. ToolBar

- 펜툴 : 펜 선택한 경우, 선 굵기와 색상을 설정할 수 있는 사이드바가 표시됩니다.
- 지우개툴: 사용자가 마우스를 클릭하고 클릭을 뗀 지점까지 적용되어있는 굵기로 지워집니다.
- Undo: lines 상태에서 마지막 선을 제거합니다. 제거한 선은 undoneItem 상태에 저장합니다.
- Redo: undoneItem 상태에 저장된 마지막 선을 다시 추가합니다.
  <br><br>

## :: 고민

💡 삽질기록 블로그글 - [화이트보드, 그 여정과 새싹톤 도전기](https://velog.io/@yjinhann)

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
