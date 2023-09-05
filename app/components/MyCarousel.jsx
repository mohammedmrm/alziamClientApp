import React, { useEffect, useState } from "react";
import { Dimensions, View, Image, TouchableOpacity, Text } from "react-native";
import { Linking } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import getAdsAPI from "../api/getAds";
import useAuth from "../auth/useAuth";
function MyCarousel() {
  let { user } = useAuth();
  const [ads, setAds] = useState([]);
  const loadAds = async () => {
    var results = await getAdsAPI.getAds(user?.token);
    console.log(results.data);
    setAds(results.data.data);
  };
  useEffect(() => {
    loadAds();
  }, []);
  loadInBrowser = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };
  const PAGE_WIDTH = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        height={PAGE_WIDTH / 2}
        width={PAGE_WIDTH}
        loop
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={true}
        autoPlayInterval={2000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={ads}
        renderItem={({ index, item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => loadInBrowser(item.link)}>
              <Image
                source={{
                  uri: item.img,
                  headers: { Accept: "image/*" },
                }}
                style={{ width: "100%", height: "95%" }}
              />
              <Text>{item.img}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default MyCarousel;
