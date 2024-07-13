import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Alert } from "react-native";
import appColors from "../../../assets/colors/appColors";

import defaultStyle from "../../../assets/defaultStyle";
import Topbar from "../../../components/Topbar";
import PagerView from "react-native-pager-view";
import React, { useState, useRef, useEffect } from "react";
import BalancePage from "../../../components/BalancePage";
import ExpensePage from "../../../components/ExpensePage";
import IncomePage from "../../../components/IncomePage";
import InputExpense from "../../../components/InputExpense";
import PreviewHeader from "../../../components/homeComponents/pageviewHeader";
import KeyboardHandler from "../../../components/generals/KeyboardHandler";
import { useRouter } from "expo-router";
import { useContext } from "react";
import AppContext from "../../../context/appcontext";
import apis from "../../../assets/apis";
import ExpenseBreakdown from "../../../components/BreakDownPage";


const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.project,
    width: "100%"
  },
  tabContainer: {
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "space-between"
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontWeight: "800",
    fontSize: 16
  },
})

export default () => {

  const [summaryState,updateSummaryState] = useState(true);
  const appC = useContext(AppContext);
  const {appData , signOutUser , setLoading , myReq , updateAppData} = appC;
  
  const [expenses,setExpenses] = useState(appData.summary || []);
  const [breakdownCategory,setBreakdownCategory] = useState();
  const expenseCategoryData = ()=>{
    var cat = 0;
    expenses.map(
      (x,ind)=>{
        if(x.category_id == breakdownCategory){
          cat = x;
        }
      }
    );
    if(cat == 0){
      return {name:'No category',total:'0'}
    }else{
      return {name:cat.category_name,total:cat.total_amount}
    }
  } 
  useEffect(
    ()=>{
      async function getExpenseSUmmary(){
        try{
          const reqData = await myReq(apis.expenseSummary,null,false);
          reqData.data && setExpenses(reqData.data);
          reqData.data && updateAppData({summary:reqData.data});
          console.log(reqData,"here for");
        }catch(e){
          console.log(e);
        }
      }
      getExpenseSUmmary();
    },[summaryState]
  )
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const [fullSectionMode, setFullSectionMode] = useState(false);
  const maxPageIndex = 2;
  const externalScreen = useRef(0);
  //const externalScreenPage = useRef(0);

  const handleTabPress = (index) => {
    setSelectedTab(index);
    pagerRef.current.setPage(index);
  };

  const handlePageSelected = (event) => {
    const position = event.nativeEvent.position;
    //console.log(position);
    externalScreen.current = position;
    if (position <= maxPageIndex) {
      setFullSectionMode(false);
      setSelectedTab(position);
    } else {
      setFullSectionMode(true);
    }
  };

  const handlePageScroll = (event) => {
    const { position, offset } = event.nativeEvent;
    if (position === 2 && offset > 0 && !fullSectionMode) { // On BalancePage, prevent scroll to the right
      //console.log("i did it ")
      pagerRef.current.setScrollEnabled(false);
      pagerRef.current.setPageWithoutAnimation(2); // Reset to current page
      setTimeout(() => {
        pagerRef.current.setScrollEnabled(true);
      }, 300); // Re-enable scrolling after short delay to allow reset
    }
  };

  const pagerRef = React.useRef(null);

  const TabSlider = ({ index, name }) => {
    return (
      <TouchableOpacity style={[Styles.tab, selectedTab === index && Styles.activeTab]} onPress={() => { handleTabPress(index) }}>
        <Text style={Styles.tabText}>{name}</Text>
      </TouchableOpacity>
    )
  }
  useEffect(
    () => {
      if (fullSectionMode) {
        if (externalScreen.current > maxPageIndex)
          handleTabPress(externalScreen.current);
      }
    }, [fullSectionMode]
  );
  const enterInputExpensePage = () => {
    externalScreen.current = 3;
    setFullSectionMode(true);
  }
  const enterExpenseBreakDown = (x) => {
    setBreakdownCategory(x);
    externalScreen.current = 4;
    setFullSectionMode(true);
  }
  const getTitle = () => {
    switch (selectedTab) {
      case 3:
        return "Input Expense";
        break;
      case 4:
        return expenseCategoryData().name;
        break;
      default:
        return "Not Fount";
    }
  }
  return (
    <SafeAreaView style={[defaultStyle.safeArea]}>
      <KeyboardHandler>
        <View style={[defaultStyle.container]}>
          <View style={[defaultStyle.top, { justifyContent: "flex-end" }]}>
            <Topbar name={appData.name} />
          </View>
          <View style={[defaultStyle.body]}>
            {
              selectedTab <= maxPageIndex ? (<View style={Styles.tabContainer}>
                <TabSlider index={0} name={"Expense"} />
                <TabSlider index={1} name={"Income"} />
                <TabSlider index={2} name={"Balance"} />
              </View>) : (
                <PreviewHeader title={getTitle()} backFunction={() => { handleTabPress(0) }} />
              )
            }
            <View style={{ flex: 10 }}>
              <PagerView
                onPageSelected={handlePageSelected}
                style={{ flex: 1 }}
                initialPage={0}
                ref={pagerRef}
                scrollEnabled={!fullSectionMode}
                onPageScroll={handlePageScroll}
              // onPageScrollStateChanged={handlePageScroll}
              >
                <ExpensePage key={1} inputExpense={enterInputExpensePage} enterBreakdown={enterExpenseBreakDown} expenses={expenses} />
                <IncomePage key={2} />
                <BalancePage key={3} />
                {
                  (fullSectionMode && externalScreen.current == 3) ? <InputExpense key={4} updatePage={()=>{updateSummaryState(!summaryState)}} /> : <></>
                }
                {
                  (fullSectionMode && externalScreen.current == 4)  ? <ExpenseBreakdown key={5} updateSummary={()=>{updateSummaryState(!summaryState)}} categoryId={breakdownCategory} total={expenseCategoryData().total}/> : <></>
                }
              </PagerView>
            </View>
          </View>
        </View>
      </KeyboardHandler>
    </SafeAreaView>
  )
}
