import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUserPlus,
  FaChartLine,
  FaQuestionCircle,
  FaBuilding,
  FaMoon,
  FaSun,
  FaBriefcase,
  FaHandshake,
  FaLightbulb,
  FaGlobe,
  FaRocket,
  FaCoins,
  FaArrowUp,
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const speed = 1;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += speed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  const handleLogout = () => navigate("/");
  const handleProfileClick = () => navigate("/profile");
  const handleBlockClick = () => navigate("/blank");

  const handleQuickAccessClick = (route) => {
    navigate(route);
  };

  // Dynamic styles based on theme
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      height: "100vh",
      overflowY: "scroll",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
      position: "relative",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: isDarkMode ? "#333333" : "#143645",
      color: "#ffffff",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: "0",
      zIndex: "10",
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logo: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    profileSection: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    iconButton: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      backgroundColor: "transparent",
      border: "none",
      color: "#ffffff",
      cursor: "pointer",
      fontSize: "16px",
      transition: "color 0.3s ease-in-out",
    },
    iconButtonHover: {
      color: "#ffcc00",
    },
    profileImage: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
      cursor: "pointer",
      border: "2px solid #ffffff",
      transition: "border-color 0.3s ease-in-out",
    },
    profileImageHover: {
      borderColor: "#ffcc00",
    },
    blocksContainer: {
      display: "flex",
      overflowX: "hidden",
      whiteSpace: "nowrap",
      gap: "20px",
      padding: "20px",
      position: "relative",
      background: isDarkMode
        ? "linear-gradient(270deg, #1a1a1a, #2a2a2a, #1a1a1a)"
        : "linear-gradient(270deg, #f0f4f8, #ffffff, #f0f4f8)",
      backgroundSize: "400% 400%",
      animation: "gradientAnimation 10s ease infinite",
    },
    block: {
      minWidth: "350px",
      padding: "20px",
      textAlign: "center",
      backgroundColor: isDarkMode ? "#444444" : "#ffffff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "15px",
      color: isDarkMode ? "#ffffff" : "#143645",
    },
    blockLogo: {
      width: "100px",
      height: "100px",
      objectFit: "contain",
      borderRadius: "12px",
    },
    quickAccessBlock: {
      width: "45%",
      padding: "30px",
      textAlign: "center",
      backgroundColor: isDarkMode ? "#444444" : "#ffffff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
    },
    footer: {
      marginTop: "20px",
      padding: "20px",
      backgroundColor: isDarkMode ? "#333333" : "#143645",
      color: "#ffffff",
      textAlign: "center",
    },
    footerBlock: {
      marginBottom: "20px",
      padding: "20px",
      backgroundColor: isDarkMode ? "#444444" : "rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      textAlign: "center",
    },
    footerHeading: { fontSize: "18px", marginBottom: "10px", fontWeight: "600" },
    icon: {
      fontSize: "24px",
      color: isDarkMode ? "#ffffff" : "#143645",
      transition: "color 0.3s ease-in-out",
    },
    middleSection: {
      position: "relative",
      padding: "40px 20px 100px 20px",
      textAlign: "center",
      backgroundColor: isDarkMode ? "#2a2a2a" : "#f0f4f8",
      overflow: "hidden",
      background: isDarkMode
        ? "linear-gradient(45deg, #1a1a1a, #2a2a2a, #1a1a1a)"
        : "linear-gradient(45deg, #f0f4f8, #ffffff, #f0f4f8)",
      backgroundSize: "400% 400%",
      animation: "gradientAnimation 10s ease infinite",
    },
    animatedBackground: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: isDarkMode
        ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))"
        : "linear-gradient(to bottom, rgba(20, 54, 69, 0.05), rgba(20, 54, 69, 0.05))",
      zIndex: "0",
    },
    graphContainer: {
      position: "absolute",
      bottom: "20px",
      left: "0",
      width: "100%",
      height: "50px",
      display: "flex",
      alignItems: "flex-end",
      gap: "2px",
      padding: "0 20px",
      zIndex: "1",
      overflow: "hidden",
    },
    graphBar: {
      flex: 1,
      height: "50px",
      backgroundColor: isDarkMode ? "#ffffff" : "#143645",
      animation: "rise 3s infinite ease-in-out",
    },
    floatingIcon: {
      position: "absolute",
      fontSize: "24px",
      color: isDarkMode ? "#ffffff" : "#143645",
      animation: "float 6s infinite ease-in-out",
    },
    quickAccessContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
      position: "relative",
      zIndex: "1",
    },
  };

  // Franchise data with unique logo URLs
  const franchises = [
    { name: "KFC", logo: "data:image/png;base64,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" },
    { name: "McDonald's", logo: "https://logos-world.net/wp-content/uploads/2020/04/McDonalds-Logo.png" },
    { name: "Subway", logo: "data:image/png;base64,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" },
    { name: "Domino's", logo: "data:image/png;base64,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" },
    { name: "Jockey", logo: "data:image/png;base64,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" },
    { name: "DFC", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEXpGBH////oAADpFQ3pFAvpDQDpEAb++fj//fz98fD++vnpDwP99PPpJB787u350tD62dj86OftZ2T74+L3w8HxhoT63t3ua2j2ubfxjYv75eP1sa/4zMvrQTz0pqT1s7HwgH3vdnPzoJ7tYF3tWlfylJLqLinympjsVFD4zcvqNzLqMCvub2zsTEnpHhjwenfqPTnsTktH587aAAAVSklEQVR4nO1d6ZqizA6WQCEuKCgiiqCiou0+939zp1IFyG73Ny0w5+H9Mc90qy0hqewJnU6LFi1atGjRokWLFi1atGjRokWLFi1atGjR4j9AFEUpgCjWfTG/DHEACNK5qwz3DmE/S3Vf2K9AQlJu14P1ZY66QoCubq7s2cSnr/3bVEqUVZ2ta/aEfHRH1kzFO/BvCq0IoE7W0wLiXhiujif63n+NSHrJg8dq+Ja8ACPrSj9Q90X/AATI1VBiFCi6sXZn293JQZx225lrG1o3/pah7fwzjAQ4rV/cmxqHyQU4CJERhAQ/S7eHt9Kjt2ob8g8oHiqeWy2ibj1/MqtQwBtuRZ5zN/xEzyMgV3vBPwWQWaA4h8YGr19+K3iijCyd2yP+ubXT5AM5gAnXnUNrPvjRqaKsh5Nnsg9bTlP5KMJzxS7RmJD/YOJEykrHZZy0Lo08j0A8pvgP/n+34DLAhClhtwO/enG/AAn2qBTN61+qQ8rJs0e9u+GMurFNAtwtSt949xsmjTJyQ4+zeWsQG0XYUQ1qzn/rtqPJoVrHa4zGIWBTsdrAL95zSuOmK2h+M9gITypTtvTLLpcIHVtQTg0gUYRtXxjtP+BSSnAbC7vaSZSA2oj1OwEVJfm/aFgCpy+nZssogyH0t2UMREMO9/PT/0+RLoH731ze34N0TEG/lDCQns65rfXRiHfH9o5HuiILLP6JSIlcdMEoMxHg2/14pNs15pQ0cXt0j1exYSY9DwN5JLhlLgzZdYU09AVsg+BjD40xePmQxKUwKxU28HJTFssornefTWakCF/CJO8IimKY8JV8JY/EkFIWh9yaeyDB6zkZApnm7Nzx3wG9cnBGJRQuWDxoN1VURd8lGQmjwY831rvKSFs/bkxjHsuYqE5YPNJpKokZ8ZJgEWdZ78tdzLQi8tg5vLCTqjVXUJMQgUmd5h4PnlEinXESaVjZRUGt+9q/B7DYVR9mj9lsT+PY/hvyEGOAP1QbnRsqpynAKnbpytSdlSnSEDMaJqFjW/fFfw8BE3+EEYiwFLr/yEkU4fBzEh0ZHoJwbR4T8wspcP0JcdqWyvGESOpQsBpHIWwstHdEThasRbgV1QozoNRtvgTBlzowFaZNo1B26CWODG/uqBLEQBz3O+qFYdMXzDn13OntMptHITlFF9ozx1+G5bquba20bxcMOZaAwbMo6cJX0yiU/GxY9GNMTYtFFvJZERacwpfTXjtgnH/Vyg+4qAfZHTKnGnXAaorSnQl9E4oWMM+75u7C/Y4jE+LJPRlwkdjTwtKW+khfavbj3oSokfugaQ6Wye7aWVhJb3XGeQiGoNkJ3is0aqydj+T2A2ZxuFjvXaxed4FTCLfEfVG4FFhq7boHZj8mkaoTGcC/WgHD9kSkxy7lvupjm/1ieK3dkysNblMwj56x7K6BEN6l4G9cy0KenjdLyjY714jatUvqT7ioYXKD7CcBdrv9fjLzjGmatGmgqSx0jca15zfgWRrBJ7ABCcTCVyNCp52Th3905G+GTchvENgV2MUElmPbu8F976Z+PwxYuNoZ0e/0+QXwJ8VCQhuQ3wDYf5WTZ259AGe2Xob2wDzMttfrdX7ybyye7E/gFP+AEm+VakDMAfdZeTShjT2AkDjqwXosB+ffrmveDKU4lzRv48jNyFYICRbfcFBnEEjhFokbdMhu+nJ9unrq3csvw/Y82+BuvFYvhRJZCe/Rd3h2o6cfAiemWEFp1GMLIZ0Xhj7y6zQZYsmlRiwaCgbWKfQNtsryz8GXOdV7OR6suad0RbpFlGv3wpnwucXRRNdYnHyVS6EWv1S8cPXs3FK+7fE3ex1+AyzvtCs2+10Z0xwQdAnvebggElYIxrZ9ogoCAL8By5Gg7DAabkBQEWHwFNDVLNM0PaoJ5ecD39Ln5wlgNyEBp6QLVULcnppOH9NtInSa0HwRAg+hBrsSAimJHbGDGV9F2/M4YktlujsLz2MopUuwWOQB8x5PDouSTD3Y952bHwXZC+iL+aUUCjtCzgp2NzHpC/Opj0CnBhI+VP9Qeb1QzYmfQEo7vnPa72916xkqYEpk6vJh3SWubzdIk/wMfj3izliYXd3RP6UFhnUCN1vrDZlfo/TW9zqFVr6w+5822C9olAciMIfFZCTBInhFcZhHzV+jUdKd04137OXo9odoT8rL6B/Gm+hphZIZpAK4/mCCjeiqKH0ijPgPBHlr3ihtOjM9ypc7m9zucJ+bNXumpTn8HgvugpycG2VkGI5c7fA7RPXOYOI9grKONlsOnTn12ZZTc2zh+x+1knguDiyuLOY9xZmGpRvKNp3rUvnOTh7jEQ38KX/7Xxsa9ZvDpAFa1Wo/BlDkmGpnU1sArIMfw4wviI4zYP+XgN2dcXjOYD+Rn15O1nxUr4UsLBmOuQCGkZUeEiLK3MpBILH7ICsM0n6dpq431XTNduqN82EplOCxj/47j+lEzGvvAmtvAPv5ZGcK/8aEF33qJVDslBE4jISUMnEHoaCCv1lH9FhAQD1kTc6X04yZPVLqtLkQl7vpDog0ALgmUjtzmOT4DPq8KYMzqPCL1al/Sv5snMjNS7Kru8gbUFw2J4zCFvbC9L4Za9zrxjKGb9Af1526iIMadIUUXeoxlgJQDqX+K7shgRncHanmrZuwECINbxWp6JL/qDHT3fV3mL+PGGnT07hKZOk8f4ESPKOeUr82CtPaDevTilggfiOYxH8c3kB1OqFxsVG2uxNFGJqRWtWR5S4MHCyY1kKfqKZbl7BPpAcFLWwrSOZBlRPIMNP7gq4be57bWDkObBJ23sJAX6+r0U3yhVRqT6LR7bIo4XbMvECDRLgrgjU7RAVRLZVxQ+8O4+RFLdZCUoVzkkIMac2iGHgLmV8dgfzJf3MEhzNRWD1rCAxFUfmTTIUhD7WcOmIfXbLbM3v9NrxrDBteoCOrJr8dlZMI02PyfEhqjwYHp/RV9rD3WZHyAmSDOpqJLOnwkPK3R2fSkdkRrmE8D6xU65JIdLTOKVWz9Dv0qhX0BrKwIOGse1me9u4Eu8fwPsyrJhE26VZXyg/qYSVnDiibbgpSmK+B1lHA1Z8eSV6ubnSXMZzCpM6xYhJlJ0xHRBTa1JSTezwo90AkrNnGL7AiG7hN5pPJ/nQGkHLV1BfPW51GaB6r1TcwGiaNPo6/7EgsXzPCiJYnYA4FFCo+a1gguJ2G7HPfwmtU7MS61XKRxnvJvJBI+hjDwoP7NX2XBQU8LNRTKoQz2uzHW56LAmhud2WiVS2olGUptx+JeVISz4YimJ7PZErOP4EbxtPeWtCjbH0wAZVFkEKUUYlVqm5EasRPCSslqYow8lknEK/10f+cc6edBCNUKv3QbxBJUpB7Lw/3xr+FUB9VOafcm4+eTMqdVCco1l16j1cP7XM2LgoEQ9dgFF5jlAMPoL98hzAPjMYklU4UB58cusQvvCVvKbvunnXYzq8z1yjrWtgE0hsqD5Gk3317BfwS5zObUtklxAaMxwedHXREjdS5wLHyb2EMMmY8oh6ZbFXAe6V9gpI/yyknzj7shMsnK1KYpb+lbiGo8Up3d3XY73Kd8a5KYD62oplnyGTYvl6/MkOqkPExd5i65elb/MsUPnIaQCQAZ+Hatu0eJh22Sii/q29OcHgvUqTZJtzhy4frh94TmSTmoqjH+tnwWMQE4TZ7Ewdhs354fPJSaJvE5/IKAnCO/ht+CcZSo6hBgzypsH+SQD742vXf5qFzgyQvfm25zfAqCzym6/ib8RtDE4WK59NdUhIN0qn+fmeTMNmSQeIAoZnJwGFhk+7F34y6JtQ7lNrlxz1Vdg2Ld/dRhByrmJCvXJ97xw5ndxZ/M/6pgFz4842v/mtg9iks6pYAcizjNH77824BPXzM8UFP/qXPYBSQK1ED2q3Ah2N6cqS+OYp5vfzD2FYzSc0hEHURpqbmSQq1IEWMkeXnWdgJ2GO+OQ68vD3cJghQX6aa5FbIN8BcVTT8L+8QE+ssZKFOnl5JQYqHg1Y5iZzC1AhNrNiZn5HaAkGbfxPiHQpYLMao8yTkGqoPQOSWzCv9styJk8nLN8n3CW5EpgKioyI+xnlIKST+sLquaFlledxDGYk8Ez5ipbeIkbFDlE8hyNhas9onuMWklNzxD1Y2ER34zIeSOwrsJngoqxoGSczHiaUk0P3LQAeW1lgsoqYi9tYxeqnTd/f0dxF4XF4hiSKfPDjjjXeRQnZPYt0/Ul5DnM37F/ZW1BjGvkwX1uwPVdm5L6vc3BWmwtiQqTBlZX4PKWRuNjXcJGRNNuePVhZZOJSHCf8HugIPLN9ZqF8FBEkyq6B7kOtbmyX2GQ/3bFcgwP4WXGaO4x0kl03052YRhdIleLkaPfoiIdD240FuwM1fnrPD5uH/HVQ3V3r6Qubk+KU7Hh6aeITv0Z0LdVLFeUVqMgK/cvnM+2aW2O7eWQVxg5d46TEpXCHXmWRnYwtNeoVcr/IBXLgq/qq8FiVFuc55jqSy+HDJJXGPwRBraH9Sd8gA9c67otZJAgUr5h5EWhMuPB+3rGG9OTPBDGuSZqN07gtRP41Pua0QJFmlbol1C4x52QKiMAKVYcPf1PPraHGHqNqpn1Js5BmKK2GXhz5Jj/k46Fm6XuhyppOJMfC0hQhq0KyjnOvp4Y9VDg01cUx4fYm3Kkwxl8Rq4TrSullht6H0elcOFOaivxYUdWtb9BnLyne9+I454AOSjEljPJMaEveFNnBO+QqEbbETiwrkqDYJzEPF0/9TX39N3PcaHuRQVnnL+oYTYKOLukIKD9RsKKif4KLYnMTcsbVuRxrgVsjwD9e6qjVRWxke7kETPlrAvs+17QajeQspvIb2AZNLbIZGhFNOFecA4Ly4O8o1RxWSmGwLOjBZZcHhCs5M0ewxmj/SX/VD3cvUzjpsnZ2kx1BHoMYOqH6ve1AIzokCUncBIDNjfuUizMZFqBMWo2OK+bow04Srkd3EnzjEGwCM2qedKRfUJBOWW1bY7wZ9zjpzz7ZxCleogWKZc+wRPnxpoQzHzWTVVe58yGl9oeE1WsFs7Jr1ZFzjVdMxugOJKh3u+7xmHQCldDNqhRBhks0dzoMWjQ2z9btMmv8VKyJ5ziKn3j09N6YLswP3zNT6SOc8Ada7+CeTP12AyJ8ZQLnnZjYPIOwmbDiJIMEmf2/Ll4+s7J8zLe9ngPvz9HCLHmTS2zVEQiPAuWTqeXhPl9KUsTkt2zxY79RaPmS4Fo8Ef3s/FoeZduUbAgDvF9ZH4dx3o05gHCL4399mVoTeLBNuVg6peHqVvrT5/sKTHEwfDdiDDepjey6+Dhxi+q/CakyaMEvCE97mpnjmisBglle2eIPR8VJw/qpd4iaFzc29owNFGoG6KbfsNFopefa+QPaDtYWfpCn1hWpk2pWlPSncXEEZubO+uSbS9E4kdbPkqI+sczR7Pa3Kh7IkK3+Kcb0UUInNM5fZetorUa/93tibZJ4pgA06G4NNKpihO6hnV2t/DOmNgn3T3aoFVLKnHzqTjWeNzQSlXV1b2TP+SK/UKRuAesjRx0OnMi5KYo4a0ddIZW63Uuhgyx314twQZ/8u8qdYZhdDDOBWkIIbVWdGirKA2uFWohHYY0jlwYAM5JInkcKzeMitsspF2WrP8fxHWi9NZkFDXIBuVfuGSnLVFPokfiC5MOYtKWGvkKTjAE7p4HRlNeDy+W3qmLzW6NDo33OPmxtkQSaH1VQ3PRLrz8hdGRpDRcsH0sNZvevEStqDUaTYw6R2X7PsA4eHbZprYxl+ZNqJ+k1LZQNR0S7edCr+RGXtnpwA6gdNYeQdUxBRyTRBYHe1eFw3h2QGoJrJhLSeYXlPCSYJNiq8GJYpEeaCd8Qm14is1UCY79uX89e7V6Jp0rIULpJNjnTz7qz3codgJQySaNfcRF49dRnCXOWwmhJbpvs3bCtPUePyyst3YkVW0U70UK2TudQJsnFoq9X4NLFN3pxZrzbQZCzBZE+SMnKqBIj9KhqVCqGm6q3ktrtJVWVu0nrm1WSeynwbQRk31VWylfgDcwei+gipBOrvxKOQTKu8SB2hqjw2KT2b/mrGS1uzQHxTt8QnYgAp3IQ2ghQLa925k/aqlMiaZexkoNpTPOS9d3wHJlyCLTap8/rpbvwyiCQ1BRK7GNlJsjeQtZSyYQ15sJ2aloPzYFfrawuvtieOYVGbLPl8rJ8Zp4t5ioMUhcNgj2Ay1MK5At70xqrAPD+R7o/a5WtNONn2p13TjEsam9XL7KrhszwpChlZvCplvpRUSuPme2f8GJQ37v41gZPklbzWP3Vy+DtnlXqSvCl75Fog6tGEFqR33OQ1XwQPWxI+uTcqO+sTj0kz0+nM2xHFpJm0bMsKsyDRw2UyjkFOj5ccxt2zDzIxO04XHyjNXCa7FMkvLtcsCimk1jRJogidUCd/iEKW3FPTJcL4eAcbF0qAsUg+F2faXu152cKcMYgdAOo3PKIbVaCG/hLgPBael4l84/5jNnxlDB6UPEPhNbyV0zg0ugZJdep7k+3reAw/EmAUxXmTuJCm01N8oLlsG1hEIUlrMIbp8cnip+s67tJ9xh3InTOjtzmWMBNJWhq5xc/tyU9TKJLCw5qR8c8M50lqbnYtPm2XnYEJFiOUbGuJDY3kbgnJw6fMYcYQMsRsxUBNc0Hh5yVtzF24d8LW2deAiXz53vNpep8br8RHU2egRZE4yer71MrSEDugQUXA15hW/N6zMozBJ23h2c3m8g0xyKY4mde6gcpLzz9hcBs+oyYe6BauCY3h8dkgGC3i3EqfR9M6zhZ2Th0j3BCSHhzBsCHw5BJJerHoCVIRtAqerSMSuD/ePM4iQNjTJaY38rFRBNgpwjA1UpS/quaFY0VNitT8+rnLHJOINstmFtDwp1jBxck8qFUqU7tfVa7+wvLlsbxM//IqM5WWYCZfyilliPAsOIyrXdXr22QksjhReAgIpG+7pzdDlK58GMApK6oj16mjgQifPUE2uc/ENfxAoMDZ5hQacUd0scARgK0VbSfqjlaHc417dtFU3DZWfH2zoh2dUEKLnNnV4Vomc/hX1dNku91OTn7ta4Q7Iu7DkPzT4+C53mHrdGJXVOKJjd7E6RJ7shepYdQpH6JEAsOfUB9lvua1qZ15P0KJI6acm8KdvwNsihqGKlmMUAWg87A0c6qP4k93mmp2k5608pfgjjkhnbvKcWdp6/+LQ/gCr8KEaM6zYlu0aNGiRYsWLVq0aNGiRYsWLVq0aNGiRYt/Cv8DLIc8jN0GQbsAAAAASUVORK5CYII=" },
    { name: "Lenskart", logo: "https://about.ads.microsoft.com/adobe/dynamicmedia/deliver/dm-aid--62d44d69-ad31-4a2c-ad52-0a9579863e2b/pub-10523-image01.jpg?quality=85&preferwebp=true" },
    { name: "Amul", logo: "https://i.pinimg.com/736x/89/5c/f4/895cf4457b3c075b2d153f44f2700f1b.jpg" },
  ];


  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        {/* Logo and Title */}
        <div style={styles.logoSection}>
          <img src="/path/to/logo.png" alt="Logo" style={styles.logo} />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Franchise Bridge</span>
        </div>

        {/* Profile and Icons */}
        <div style={styles.profileSection}>
          <button
            style={styles.iconButton}
            onClick={toggleTheme}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffcc00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />} {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            style={styles.iconButton}
            onClick={handleLogout}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffcc00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            <FaSignOutAlt /> Logout
          </button>
          <img
            src="/path/to/profile.jpg"
            alt="Profile"
            style={styles.profileImage}
            onClick={handleProfileClick}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffcc00")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
          />
        </div>
      </div>

      {/* Scrolling Blocks Section */}
      <div style={styles.blocksContainer} ref={scrollContainerRef}>
        {franchises.concat(franchises).map((franchise, index) => (
          <div
            key={index}
            style={styles.block}
            onClick={handleBlockClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img src={franchise.logo} alt={franchise.name} style={styles.blockLogo} />
            {franchise.name}
          </div>
        ))}
      </div>

      {/* Middle Section with Professional Investor-Themed Animation */}
      <div style={styles.middleSection}>
        <div style={styles.animatedBackground}></div>
        {/* Graph Bars Animation */}
        <div style={styles.graphContainer}>
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.graphBar,
                height: `${Math.random() * 50}px`,
                animationDelay: `${index * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
        {/* Floating Icons */}
        <FaCoins style={{ ...styles.floatingIcon, top: "10%", left: "5%", animationDelay: "0s" }} />
        <FaChartLine style={{ ...styles.floatingIcon, top: "20%", left: "30%", animationDelay: "2s" }} />
        <FaArrowUp style={{ ...styles.floatingIcon, top: "15%", left: "70%", animationDelay: "4s" }} />
        <FaBriefcase style={{ ...styles.floatingIcon, top: "5%", left: "50%", animationDelay: "1s" }} />
        <FaHandshake style={{ ...styles.floatingIcon, top: "25%", left: "80%", animationDelay: "3s" }} />
        <FaLightbulb style={{ ...styles.floatingIcon, top: "30%", left: "10%", animationDelay: "5s" }} />
        <FaGlobe style={{ ...styles.floatingIcon, top: "35%", left: "60%", animationDelay: "6s" }} />
        <FaRocket style={{ ...styles.floatingIcon, top: "40%", left: "20%", animationDelay: "7s" }} />
        <h2 style={{ marginBottom: "20px", color: isDarkMode ? "#ffffff" : "#143645", position: "relative", zIndex: "1" }}>Quick Access</h2>
        <div style={styles.quickAccessContainer}>
          {[
            { icon: <FaUserPlus size={40} color={isDarkMode ? "#ffffff" : "#143645"} />, label: "Register", route: "/registerin" },
            { icon: <FaChartLine size={40} color={isDarkMode ? "#ffffff" : "#143645"} />, label: "Shedule a call", route: "/schedulecall" },
            { icon: <FaQuestionCircle size={40} color={isDarkMode ? "#ffffff" : "#143645"} />, label: "FAQs", route: "/faq" },
            { icon: <FaBuilding size={40} color={isDarkMode ? "#ffffff" : "#143645"} />, label: "View Companies", route: "/comlist" },
          ].map((item, index) => (
            <div
              key={index}
              style={styles.quickAccessBlock}
              onClick={() => handleQuickAccessClick(item.route)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                e.currentTarget.style.backgroundColor = isDarkMode ? "#555555" : "#f0f4f8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.backgroundColor = isDarkMode ? "#444444" : "#ffffff";
              }}
            >
              {item.icon}
              <p style={{ fontSize: "18px", fontWeight: "600", marginTop: "15px", color: isDarkMode ? "#ffffff" : "#143645" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div style={styles.footer}>
        <div style={styles.footerBlock}>
          <div style={styles.footerHeading}>About Us</div>
          <p>Franchise Bridge connects entrepreneurs with top franchise opportunities.</p>
        </div>
        <div style={styles.footerBlock}>
          <div style={styles.footerHeading}>Our Achievements</div>
          <p>We have successfully helped over 1,000 businesses find the perfect franchise match.</p>
          <p>Rated #1 in Franchise Consulting Services for three consecutive years.</p>
        </div>
        <div style={styles.footerBlock}>
          <div style={styles.footerHeading}>Contact Details</div>
          <p>Email: support@franchisebridge.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>

      {/* Add CSS Animation */}
      <style>
        {`
          @keyframes rise {
            0% {
              height: 0;
            }
            50% {
              height: 50px;
            }
            100% {
              height: 0;
            }
          }
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;