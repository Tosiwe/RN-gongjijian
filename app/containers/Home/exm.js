import React, { Component } from "react"
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native"

const { height, width } = Dimensions.get("window")
const ITEM_HEIGHT = 100

export default class FlatListExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  _renderItem = item => {
    const item1 = item
    const txt = `第${item1.index}个title=${item1.item.title}`
    const bgColor = item1.index % 2 === 0 ? "red" : "blue"
    return (
      <TouchableOpacity
        onPress={() => {
          alert(txt)
        }}
      >
                       {" "}
        <Text
          style={[
            {
              flex: 1,
              height: ITEM_HEIGHT,
              backgroundColor: bgColor,
              width: width / 2
            },
            styles.txt
          ]}
        >
          {txt}
        </Text>
        {" "}
      </TouchableOpacity>
    )
  };

  _header = () => (
    <Text style={[styles.txt, { backgroundColor: "black" }]}>这是头部</Text>
  );

  _footer = () => (
    <Text style={[styles.txt, { backgroundColor: "black" }]}>这是尾部</Text>
  );

  _separator = () => <View style={{ height: 2, backgroundColor: "yellow" }} />;

  _onRefresh=()=> {
    alert("正在刷新中.... ")
  }

  render() {
    const data = []
    for (let i = 0; i < 31; i++) {
      data.push({ key: i, title: `${i}` })
    }
    return (
      <View style={{ flex: 1 }}>
                       {" "}
        <Button
          title="滚动到指定位置"
          onPress={() => {
            // this._flatList.scrollToEnd();
            // this._flatList.scrollToIndex({viewPosition:0,index:8});
            this._flatList.scrollToOffset({ animated: true, offset: 2000 })
          }}
        />
                       {" "}
        <View style={{ flex: 1 }}>
                             {" "}
          <FlatList
            ref={flatList => (this._flatList = flatList)}
            ListHeaderComponent={this._header}
            ListFooterComponent={this._footer}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            numColumns={2}
            columnWrapperStyle={{ borderWidth: 2, borderColor: "black" }}
            refreshing={this.state.refreshing}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: (ITEM_HEIGHT + 2) * index,
              index
            })}
            onRefresh={this._onRefresh}
            onEndReachedThreshold={0.1}
            onEndReached={info => {
              alert("滑动到底部了")
            }}
            onViewableItemsChanged={info => {
              //    alert("可见不可见触发");
            }}
            data={data}
          >
                               {" "}
          </FlatList>
                         {" "}
        </View>
                   {" "}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txt: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontSize: 30
  }
})

module.exports = FlatListExample
