import styled from 'styled-components'

export const HomeMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
`

export const SideBarMainContainer = styled.div`
  width: 20%;
  position: fixed;
  margin-top: 10vh;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#ffffff')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#313131')};
`

export const NxtWatchRightSideSection = styled.div`
  width: 80%;
  margin-top: 10vh;
  margin-left: 20%;
  min-height: 90vh;
`
export const NxtWatchVideosMainContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#f8fafc')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#313131')};
`

export const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  margin: 20px;
  width: 50%;
`
export const SearchInputAndIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 70%;
  background-color: inherit;
`
export const InputSearchField = styled.input`
  height: 40px;
  width: 350px;
  border: none;
  outline: none;
  padding: 10px;
  border: 1px solid #616e7c;
  font-size: 14px;
  width: 100%;
  background-color: inherit;
  color: inherit;
`
export const SearchIconBtn = styled.button`
  border: none;
  width: 80px;
  height: 40px;
  text-align: center;
  background-color: inherit;
  color: inherit;
  border: 1px solid #616e7c;

  cursor: pointer;
`
export const VideosContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
