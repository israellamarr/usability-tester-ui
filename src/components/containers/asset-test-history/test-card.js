// @flow

import * as React from "react";

import styled from 'styled-components';

import MdRight from 'react-icons/lib/md/keyboard-arrow-right';
import MdAvatar from 'react-icons/lib/md/perm-identity';
import MdLaptop from 'react-icons/lib/md/laptop';
import MdPhone from 'react-icons/lib/md/phone';
import MdTablet from 'react-icons/lib/md/tablet';

import { format } from 'date-fns';

import BaseButton from 'app/components/UI/inputs/base-button';
import type { Resolution } from 'app/types';
import { withRouter } from 'react-router-dom';

export type Test = {
  test_ID: string,
  date: Date,
  results: string,
  user: {
    name: string
  },
  resolution: Resolution
};

export type Props = {
  test: Test
}

export type State = {

}

class TestCard extends React.Component<Props, State> {

  componentDidMount () {

  }

  renderTestStats = () => {
    return (
      <ItemTestResults>
        <TestsPassed>
          { this.props.test.passed }
        </TestsPassed>
        <TestsFailing>
          { this.props.test.failed }
        </TestsFailing>
      </ItemTestResults>
    );
  };

  render () {
    return (
      <TestListItemWrapper >
        <LeftCol>
          <ItemDate>
            <div>
              { format( this.props.test.start, "MM/DD/YY" ) }
            </div>
            <div>
              { format( this.props.test.start, "h:mmA" ) }
            </div>
          </ItemDate>

          {/*<ItemUserData>*/}
            {/*<UserDataAvatar>*/}
              {/*<MdAvatar/>*/}
            {/*</UserDataAvatar>*/}
            {/*<UserDataName>*/}
              {/*Started By <br/>*/}
              {/*{ this.props.test.user.name }*/}
            {/*</UserDataName>*/}
          {/*</ItemUserData>*/}

          {/*<ItemResolutionInfo>*/}
            {/*<ResolutionIcon>*/}
              {/*<MdTablet/>*/}
            {/*</ResolutionIcon>*/}
            {/*<ResolutionName>*/}
              {/*{ this.props.test.resolution.name }*/}
            {/*</ResolutionName>*/}
          {/*</ItemResolutionInfo>*/}
        </LeftCol>

        <RightCol>
          {
            this.renderTestStats()
          }
        </RightCol>
        <ShowMoreButton onClick={ e => {
          this.props.history.push( `history/${ this.props.test._id }` );
        } }>
          <MdRight/>
        </ShowMoreButton>
      </TestListItemWrapper>
    );
  }
}

const TestListItemWrapper = styled.div`
  height: 64px;
  margin-top: 4px;
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${ props => props.theme.listItemBG };
  border: thin solid ${ props => props.theme.trimColor }
`;

const ItemDate = styled.div`
  font-size: ${ props => props.theme.typography.body }
`;

const ItemUserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 64px;
`;

const UserDataAvatar = styled.div`
  font-size: 24px;
`;

const UserDataName= styled.div`
  font-size: ${ props => props.theme.typography.sub_text };
  text-align: center;
`;

const ItemResolutionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 64px;
`;

const ResolutionIcon = styled.div`
  font-size: 24px;
`;

const ResolutionName = styled.div`
  font-size: ${ props => props.theme.typography.sub_text };
`;

const ItemTestResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
`;

const TestsResultTile = styled.div`
  background-color: lightgray;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: lighter;
  max-width: 36px;
  border: none;
`;

const TestsFailing = TestsResultTile.extend`
  background-color: #db4445;
`;

const TestsPassed = TestsResultTile.extend`
  background-color: #39aa56;
`;

const ShowMoreButton = BaseButton.extend`
  border: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: ${ props => props.theme.sideNavBG };
  
  &:hover {
    background-color: ${ props => props.theme.trimColor };
  }
`;

const LeftCol = styled.div`
  height: 100%;
  flex-grow: 2;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const RightCol = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 25%;
`;

export default withRouter( TestCard );