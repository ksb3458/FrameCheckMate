import React, { useState, useEffect, useRef } from 'react'; // eslint-disable-line no-unused-vars
import TopBar from "../components/TopBar";
import { useNavigate, Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import styled from 'styled-components'
import ReactPlayer from "react-player";

const ImageProcessing = () => {

  const navigate = useNavigate();

  const [fileURL, setFileURL] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null); // ReactPlayer에 대한 ref 생성
  const [playTime, setPlayTime] = useState();

	const [second, setSecond] = useState(0)
	const [minute, setMinute] = useState(0)
	const [hour, setHour] = useState(0)
  
  const moveSeconds = (event, seconds) => {
    event.preventDefault(); // 페이지 새로 고침 방지
    setIsPlaying(true);
    if (playerRef.current) {
      playerRef.current.seekTo(seconds);
    }
    setPlayTime(seconds);
  };

  const timeView = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
  
    return `${String(hours).padStart(2, '0')}:
						${String(minutes).padStart(2, '0')}:
						${String(secs).padStart(2, '0')}`;
  };

  const [aiTime, setAiTime] = useState([])

	const [splitTime, setSplitTime] = useState([])
	
  const AiResult = () => {
    const response = [
      [1, 10],
			[15, 30],
			[150, 180],
			[199, 210]
    ]

    setAiTime(response)
  }

  // 동영상 총 시간 계산
  const goDuration = (a) => {
    // setPlayTime(a);
    console.log(`총 시간${a}`);
  };

  const closeButton = () => {
    navigate('/mainWorkPage');
  }

  const imageResult = () => {
		navigate('/imageProcessingResult');
	}

  useEffect(() => {

    AiResult()

  }, [])

	return(
		<div>
			<TopBar title='영상 분석 점검' logoutView={true}/>
			<ColumnContainer>
				<WorkingBox>
					<h4>AI 분석 결과</h4>
					<div 
						style={{ 
							width:"100%",
							height:"200px", 
							border:"1px solid black"}}>
					<ReactPlayer
						url={fileURL}
						playing={isPlaying} // 재생 여부
						controls={true}
						width="100%"
						height="100%"
						ref={playerRef} // 여기서 ref 사용
						onReady={() => setIsPlaying(true)} 
						onDuration={goDuration}
					/>
					</div>

					<h4>타임스탬프</h4>
					<TimeScroll>
						{ aiTime.length == 0 
						? (
							<NoReview>
								<p>컨펌 내용이 없습니다</p>
							</NoReview>
							)	
						: (
								<>
								{ aiTime.map((list) => 
									<ReviewAlign key={list[0]}>
										<ReviewStyle>
											<TimeMove onClick={(event) => moveSeconds(event, list[0])}>
												{timeView(list[0])}
											</TimeMove> 
												~ 
											<TimeMove onClick={(event) => moveSeconds(event, list[1])}>
												{timeView(list[1])}
											</TimeMove>
										</ReviewStyle>
									</ReviewAlign>
								)}
								</>
							)
						}
						</TimeScroll>

					</WorkingBox>

					<WorkingBox>
						<h4>타임스탬프 생성</h4>
						<div>생성칸</div>
						<div style={{display:'flex', width:'100%'}}>
							<TimeInput 
							type="number" 
							value={hour}
							onChange={(event) => setHour(event.target.value)} />시
							<TimeInput 
							type="number" 
							value={minute}
							onChange={(event) => setMinute(event.target.value)} />분
							<TimeInput 
							type="number" 
							value={second}
							onChange={(event) => setSecond(event.target.value)} />초
						</div>

						<WorkingButton>
							추가하기
						</WorkingButton>
						<ResetButton>
							초기화
						</ResetButton>

						<WorkingButton 
							onClick={imageResult}>
							영상 분할하기
						</WorkingButton>
					</WorkingBox>
			</ColumnContainer>
		</div>
	)
}

const ColumnContainer = styled.div`
  border:4px dashed black; 
	width:90%; 
	padding:60px 10px; 
	height:100%; 
	display:flex; 
	justify-content:center; 
	align-items:center; 
	margin:0 auto;
`
const WorkingBox = styled.div`
  display:flex; 
	flex-direction:column; 
	font-weight:bold; 
	align-items:center; 
	margin:0px 5px; 
	padding:10px 30px; 
	border:1px solid black; 
	width:40%; 
	height:600px;
`
const WorkingButton = styled.button`
  width:150px; 
	border:none;
	border-radius:5px; 
	padding:10px 20px; 
	margin:10px 5px; 
	background-color:black; 
	color:white; 
	fontWeight:bold; 
	cursor:pointer;
`
const ResetButton = styled.button`
  width:150px; 
	border:none;
	border-radius:5px; 
	padding:10px 20px; 
	margin:10px 5px; 
	background-color:gray; 
	color:white; 
	fontWeight:bold; 
	cursor:pointer;
`
const TimeScroll = styled.div`
  border:1px solid black; 
	width:90%; 
	height:200px; 
	margin:5px; 
	padding:10px; 
	display:flex; 
	flex-direction:column; 
	overflow-y:auto;
`
const NoReview = styled.div`
  display:flex; 
	justify-content:center; 
	align-items:center; 
	height:100vh;
`
const ReviewAlign = styled.div`
  display:flex; 
	justify-content:center; 
	align-items:center; 
	margin:15px 0px; 
	width:90%; 
	padding:0px 5px;
`
const ReviewStyle = styled.div`
  border-bottom:1px solid black;
	width:85%; 
	display:flex; 
	flex-direction:row; 
	justify-content:center;
`
const TimeMove = styled.div`
  font-size:20px; 
	font-weight:bold; 
	white-space:normal; 
	cursor:pointer;
`
const TimeInput = styled.input`
	width:30%;
`
export default ImageProcessing