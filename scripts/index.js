window.onload = function () {
  checkWalletConnection();
};

function checkWalletConnection() {
  const savedAddress = localStorage.getItem("walletAddress");
  const userProfile = localStorage.getItem("userProfile");

  if (savedAddress) {
    const shortAddress = `${savedAddress.substring(
      0,
      6
    )}...${savedAddress.substring(savedAddress.length - 4)}`;

    // Ẩn nút connect và hiển thị wallet info
    document.getElementById("connectWalletBtn").style.display = "none";
    document.getElementById("walletInfo").style.display = "block";

    // Kiểm tra và hiển thị username hoặc address
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      const navbarUsername = document.getElementById("navbarUsername");
      const walletAvatar = document.querySelector(".wallet-avatar");

      if (navbarUsername) {
        navbarUsername.textContent = profile.name?.trim() || shortAddress;
      }
      if (walletAvatar && profile.profilePicture) {
        walletAvatar.src = profile.profilePicture;
      }
    } else {
      // Nếu chưa có profile, hiển thị short address
      const navbarUsername = document.getElementById("navbarUsername");
      if (navbarUsername) {
        navbarUsername.textContent = shortAddress;
      }
    }
  } else {
    showConnectButton();
  }
}

function showConnectButton() {
  document.getElementById("connectWalletBtn").style.display = "block";
  document.getElementById("walletInfo").style.display = "none";
}

function disconnectWallet() {
  localStorage.removeItem("walletAddress");
  showConnectButton();
  console.log("Wallet disconnected");
}

// Khi connect lại, chỉ cần kiểm tra và sử dụng profile cũ nếu có
async function connectWallet() {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    localStorage.setItem("walletAddress", account);

    // Kiểm tra xem có profile cũ không
    const existingProfile = localStorage.getItem("userProfile");
    if (!existingProfile) {
      // Nếu chưa có profile, tạo profile mới với địa chỉ ví
      const shortAddress = `${account.substring(0, 6)}...${account.substring(
        account.length - 4
      )}`;
      const newProfile = {
        name: shortAddress,
        bio: "",
        profilePicture: null,
      };
      localStorage.setItem("userProfile", JSON.stringify(newProfile));
    }

    checkWalletConnection();
    console.log("Wallet connected:", account);
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
}

// Lắng nghe sự kiện thay đổi tài khoản từ MetaMask
if (typeof window.ethereum !== "undefined") {
  window.ethereum.on("accountsChanged", function (accounts) {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      localStorage.setItem("walletAddress", accounts[0]);
      checkWalletConnection();
    }
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  // Mock data cho top artists
  const mockTopArtists = [
    {
      walletAddress: "0x1234...5678",
      username: "Le Phi Anh",
      avatar: "../assets/avatar_1.jpg",
      isVerified: true,
      totalSalesValue: 150.5,
      nftCount: 25
    },
    {
      walletAddress: "0x2345...6789",
      username: "cuongg",
      avatar: "../assets/avatar_2.jpg",
      isVerified: true,
      totalSalesValue: 220.75,
      nftCount: 18
    },
  ];

  // Mock data cho top NFTs
  const mockTopNFTs = [
    // Video NFTs
    {
      tokenId: "1",
      metadataUri: "ipfs://...",
      views: 2500,
      price: 3.5,
      mockMetadata: {
        name: "Digital Motion #1",
        image: "../assets/Generative video/animation_1.mp4",
        description: "A mesmerizing digital animation that explores motion and form",
        fileType: "video"
      }
    },
    {
      tokenId: "2",
      metadataUri: "ipfs://...",
      views: 1800,
      price: 2.8,
      mockMetadata: {
        name: "Fluid Dreams #2",
        image: "../assets/Generative video/animation_2.mp4",
        description: "Fluid dynamics brought to life through digital art",
        fileType: "video"
      }
    },
    {
      tokenId: "3",
      metadataUri: "ipfs://...",
      views: 2100,
      price: 4.2,
      mockMetadata: {
        name: "Cosmic Flow #3",
        image: "../assets/Generative video/animation_3.mp4",
        description: "A journey through cosmic particles and energy",
        fileType: "video"
      }
    },
    {
      tokenId: "4",
      metadataUri: "ipfs://...",
      views: 1950,
      price: 3.8,
      mockMetadata: {
        name: "Digital Waves #4",
        image: "../assets/Generative video/animation_4.mp4",
        description: "Abstract waves of digital information",
        fileType: "video"
      }
    },
    {
      tokenId: "5",
      metadataUri: "ipfs://...",
      views: 2300,
      price: 5.0,
      mockMetadata: {
        name: "Neural Dance #5",
        image: "../assets/Generative video/animation_5.mp4",
        description: "A neural network visualization in motion",
        fileType: "video"
      }
    },
    {
      tokenId: "6",
      metadataUri: "ipfs://...",
      views: 1700,
      price: 2.5,
      mockMetadata: {
        name: "Audio Visual #1",
        image: "../assets/Audio/audio_1.mp3",
        cover: "../assets/Audio cover/audio_1.jpg",
        description: "A synesthetic experience of sound and visuals",
        fileType: "audio"
      }
    },
    {
      tokenId: "7",
      metadataUri: "ipfs://...",
      views: 1600,
      price: 2.2,
      mockMetadata: {
        name: "Sonic Art #2",
        image: "../assets/Audio/audio_2.mp3",
        cover: "../assets/Audio cover/audio_2.jpg",
        description: "Where sound meets visual art",
        fileType: "audio"
      }
    },
    {
      tokenId: "8",
      metadataUri: "ipfs://...",
      views: 1900,
      price: 3.0,
      mockMetadata: {
        name: "Harmonic Flow #3",
        image: "../assets/Audio/audio_3.mp3",
        cover: "../assets/Audio cover/audio_3.jpg",
        description: "A harmony of digital sounds and visuals",
        fileType: "audio"
      }
    },
    {
      tokenId: "9",
      metadataUri: "ipfs://...",
      views: 2000,
      price: 3.5,
      mockMetadata: {
        name: "Beat Vision #4",
        image: "../assets/Audio/audio_4.mp3",
        cover: "../assets/Audio cover/audio_6.jpg",
        description: "Visual beats in digital form",
        fileType: "audio"
      }
    },

    // 3D NFTs
    {
      tokenId: "10",
      metadataUri: "ipfs://...",
      views: 3000,
      price: 5.5,
      mockMetadata: {
        name: "Digital Sculpture #1",
        image: "../assets/downloaded_model.glb",
        description: "A 3D masterpiece of digital art",
        fileType: "3d"
      }
    },
    {
      tokenId: "11",
      metadataUri: "ipfs://...",
      views: 2800,
      price: 4.8,
      mockMetadata: {
        name: "Virtual Monument #2",
        image: "../assets/downloaded_model.glb",
        description: "A monument in the digital realm",
        fileType: "3d"
      }
    },
    {
      tokenId: "12",
      metadataUri: "ipfs://...",
      views: 2600,
      price: 4.2,
      mockMetadata: {
        name: "Cyber Sculpture #3",
        image: "../assets/downloaded_model.glb",
        description: "A cyberpunk-inspired 3D creation",
        fileType: "3d"
      }
    },
    {
      tokenId: "13",
      metadataUri: "ipfs://...",
      views: 2900,
      price: 5.0,
      mockMetadata: {
        name: "Digital Artifact #4",
        image: "../assets/downloaded_model.glb",
        description: "An artifact from the digital age",
        fileType: "3d"
      }
    },
    {
      tokenId: "14",
      metadataUri: "ipfs://...",
      views: 3200,
      price: 6.0,
      mockMetadata: {
        name: "Future Relic #5",
        image: "../assets/downloaded_model.glb",
        description: "A relic from the future",
        fileType: "3d"
      }
    },

    // Image NFTs
    {
      tokenId: "15",
      metadataUri: "ipfs://...",
      views: 1500,
      price: 2.5,
      mockMetadata: {
        name: "Digital Dream #1",
        image: "../assets/Art/img_2.jpg",
        description: "A surreal digital landscape",
        fileType: "image"
      }
    },
    {
      tokenId: "16",
      metadataUri: "ipfs://...",
      views: 1800,
      price: 3.0,
      mockMetadata: {
        name: "Abstract Reality #2",
        image: "../assets/Art/img_3.jpg",
        description: "An exploration of abstract forms",
        fileType: "image"
      }
    },
    {
      tokenId: "17",
      metadataUri: "ipfs://...",
      views: 2000,
      price: 3.5,
      mockMetadata: {
        name: "Cyber Vision #3",
        image: "../assets/Art/img_4.jpg",
        description: "A vision of the cyber future",
        fileType: "image"
      }
    },
    {
      tokenId: "18",
      metadataUri: "ipfs://...",
      views: 1700,
      price: 2.8,
      mockMetadata: {
        name: "Digital Genesis #4",
        image: "../assets/Art/img_5.jpg",
        description: "The beginning of digital art",
        fileType: "image"
      }
    },
    {
      tokenId: "19",
      metadataUri: "ipfs://...",
      views: 1900,
      price: 3.2,
      mockMetadata: {
        name: "Future Past #5",
        image: "../assets/Art/img_7.jpg",
        description: "Where future meets past",
        fileType: "image"
      }
    },
    {
      tokenId: "20",
      metadataUri: "ipfs://...",
      views: 2200,
      price: 4.0,
      mockMetadata: {
        name: "Digital Essence #6",
        image: "../assets/Art/img_10.jpg",
        description: "The essence of digital creativity",
        fileType: "image"
      }
    },
    {
      tokenId: "21",
      metadataUri: "ipfs://...",
      views: 2100,
      price: 3.8,
      mockMetadata: {
        name: "Pixel Perfect #7",
        image: "../assets/Art/img_13.jpg",
        description: "Perfection in every pixel",
        fileType: "image"
      }
    },
    {
      tokenId: "22",
      metadataUri: "ipfs://...",
      views: 2400,
      price: 4.5,
      mockMetadata: {
        name: "Digital Horizon #8",
        image: "../assets/Art/img_17.jpg",
        description: "A new horizon in digital art",
        fileType: "image"
      }
    },
    {
      tokenId: "23",
      metadataUri: "ipfs://...",
      views: 2300,
      price: 4.2,
      mockMetadata: {
        name: "Virtual Reality #9",
        image: "../assets/Art/img_19.jpg",
        description: "Reality reimagined",
        fileType: "image"
      }
    },
    {
      tokenId: "24",
      metadataUri: "ipfs://...",
      views: 2600,
      price: 4.8,
      mockMetadata: {
        name: "Digital Symphony #10",
        image: "../assets/Art/img_22.jpg",
        description: "A symphony of digital elements",
        fileType: "image"
      }
    }
  ];

  async function fetchTopArtists() {
    try {
      console.log("Rendering mock top artists...");
      const artistsGrid = document.querySelector(".artists-grid");
      
      if (!artistsGrid) {
        console.error("Artists grid not found in DOM");
        return;
      }

      artistsGrid.innerHTML = "";

      mockTopArtists.forEach((artist) => {
        const artistCard = `
          <div class="artist-card" data-wallet-address="${artist.walletAddress}">
              <div class="artist-avatar">
                  <img src="${artist.avatar}" alt="${artist.username}" 
                       onerror="this.onerror=null; this.src='../assets/artists/default.jpg';" />
              </div>
              <div class="artist-info">
                  <div class="artist-name">
                      <h3>${artist.username}</h3>
                      ${
                        artist.isVerified
                          ? '<i class="bi bi-patch-check-fill artist-verified-badge"></i>'
                          : ""
                      }
                  </div>
                  <div class="artist-stats">
                      <span class="floor">Total Sales: <span>${artist.totalSalesValue.toFixed(2)} TIA</span></span>
                      <span class="volume">NFTs: <span>${artist.nftCount}</span></span>
                  </div>
              </div>
          </div>
        `;
        artistsGrid.innerHTML += artistCard;
      });

      console.log("Successfully rendered mock artists");
    } catch (error) {
      console.error("Error in fetchTopArtists:", error);
      const artistsGrid = document.querySelector(".artists-grid");
      if (artistsGrid) {
        artistsGrid.innerHTML =
          '<div class="error-message">Không thể tải thông tin nghệ sĩ. Vui lòng thử lại sau.</div>';
      }
    }
  }

  async function fetchTopNFTs() {
    try {
      console.log("Rendering mock top NFTs...");
      const nftGrid = document.querySelector(".nft-grid");
      
      if (!nftGrid) {
        console.error("NFT grid not found in DOM");
        return;
      }

      nftGrid.innerHTML = "";

      for (const nft of mockTopNFTs) {
        const metadata = nft.mockMetadata;
        let mediaElement = '';

        // Tạo media element dựa trên loại file
        switch (metadata.fileType) {
          case "video":
            mediaElement = `
              <div class="nft-image">
                <video class="nft-media" autoplay muted loop playsinline>
                  <source src="${metadata.image}" type="video/mp4">
                  <img src="../assets/placeholder.jpg" alt="Video fallback" class="nft-media">
                </video>
              </div>`;
            break;

          case "audio":
            mediaElement = `
              <div class="nft-image">
                <div class="audio-cover-container">
                  ${metadata.cover ? 
                    `<img src="${metadata.cover}" 
                         alt="${metadata.name}" 
                         class="nft-media" 
                         onerror="this.onerror=null; this.src='../assets/placeholder.jpg';">` :
                    `<div class="audio-placeholder">
                       <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                         <path d="M9 18V5l12-2v13" stroke="#0066FF" stroke-linecap="round" stroke-linejoin="round"/>
                         <circle cx="6" cy="18" r="3" stroke="#0066FF"/>
                         <circle cx="18" cy="16" r="3" stroke="#0066FF"/>
                       </svg>
                     </div>`
                  }
                  <div class="audio-indicator">
                    <i class="bi bi-music-note-beamed"></i> Audio NFT
                  </div>
                </div>
              </div>`;
            break;

          case "3d":
            mediaElement = `
              <div class="nft-image">
                <model-viewer
                  src="${metadata.image}"
                  auto-rotate
                  camera-controls
                  shadow-intensity="1"
                  environment-image="neutral"
                  exposure="0.8"
                  camera-orbit="0deg 75deg 105%"
                  min-camera-orbit="auto auto 5%"
                  max-camera-orbit="auto auto 200%"
                  interaction-prompt="none"
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  style="width: 100%; height: 100%; background-color: transparent;"
                  crossorigin="anonymous"
                  alt="${metadata.name}"
                ></model-viewer>
              </div>`;
            break;

          default: // image
            mediaElement = `
              <div class="nft-image">
                <img src="${metadata.image}" 
                  alt="${metadata.name}" 
                  class="nft-media"
                  onerror="this.onerror=null; this.src='../assets/placeholder.jpg';">
              </div>`;
        }

        const nftCard = `
          <div class="nft-item ${metadata.fileType === "3d" ? "model-3d" : ""}">
            <a href="nft-details.html?tokenId=${nft.tokenId}" class="nft-card">
              ${mediaElement}
              <div class="nft-details">
                <div class="collection-name">
                  <h3>${metadata.name}</h3>
                  <div class="type-badge ${metadata.fileType}-badge">
                    ${metadata.fileType === "3d" ? '<i class="bi bi-box"></i>' :
                      metadata.fileType === "video" ? '<i class="bi bi-play-circle"></i>' :
                      metadata.fileType === "audio" ? '<i class="bi bi-music-note"></i>' :
                      '<i class="bi bi-image"></i>'}
                  </div>
                </div>
                <div class="price-container">
                  <div class="price-row">
                    <span class="label">Views</span>
                    <span class="label">Price</span>
                  </div>
                  <div class="price-row">
                    <span class="value">${nft.views.toLocaleString()}</span>
                    <span class="value">${nft.price.toFixed(2)} TIA</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        `;
        nftGrid.innerHTML += nftCard;
      }

      // Setup model-viewer events for 3D NFTs
      const modelViewers = nftGrid.querySelectorAll('model-viewer');
      modelViewers.forEach(modelViewer => {
        modelViewer.addEventListener("error", () => {
          console.error("Model viewer error");
          modelViewer.style.display = "none";
          const placeholder = document.createElement("div");
          placeholder.className = "nft-media-wrapper";
          placeholder.innerHTML = `
            <img src="../assets/placeholder.jpg" 
                 alt="Failed to load 3D model" 
                 class="nft-media">
          `;
          modelViewer.parentElement.insertBefore(placeholder, modelViewer);
          modelViewer.remove();
        });

        modelViewer.addEventListener("load", () => {
          console.log("3D model loaded successfully");
          modelViewer.style.display = "block";
          modelViewer.dismissPoster();
          modelViewer.autoRotate = true;
          modelViewer.cameraOrbit = "auto auto 105%";
          modelViewer.autoRotateDelay = 0;
          modelViewer.rotationPerSecond = "30deg";
        });
      });

      console.log("Finished rendering all mock NFTs");
    } catch (error) {
      console.error("Error in fetchTopNFTs:", error);
      const nftGrid = document.querySelector(".nft-grid");
      if (nftGrid) {
        nftGrid.innerHTML =
          '<div class="error-message">Không thể tải thông tin NFT. Vui lòng thử lại sau.</div>';
      }
    }
  }

  // Gọi cả hai hàm độc lập với nhau
  await Promise.all([fetchTopArtists(), fetchTopNFTs()]).catch((error) => {
    console.error("Error executing fetch operations:", error);
  });
});

// Khi render creator info
function renderCreatorInfo(creator) {
  return `
        <div class="creator-info" data-wallet-address="${
          creator.walletAddress
        }">
            <img src="${creator.avatar || "../assets/user.png"}" alt="${
    creator.username
  }" class="creator-avatar">
            <div class="creator-details">
                <h3>${creator.username}</h3>
                <p class="creator-stats">${creator.totalSales} Sales</p>
            </div>
        </div>
    `;
}

async function fetchMetadata(tokenURI) {
  const gateway = "https://ipfs.io/ipfs/";

  try {
    const url = tokenURI.replace("ipfs://", gateway);
    const response = await fetch(url, {
      timeout: 3000,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Fetch failed");
    const metadata = await response.json();
    console.log("Raw metadata:", metadata);

    // Determine file type based on metadata
    let fileType = "image"; // Default to image
    if (
      metadata.modelType === "GLB" ||
      metadata.modelDetails?.fileExtension?.toLowerCase() === "glb" ||
      metadata.modelDetails?.fileExtension?.toLowerCase() === "gltf" ||
      metadata.fileType === "model/3d" ||
      metadata.fileType === "3d"
    ) {
      fileType = "3d";
      console.log("Detected 3D model");
    } else if (
      metadata.fileType === "video/mp4" ||
      metadata.image?.toLowerCase().endsWith(".mp4")
    ) {
      fileType = "video";
      console.log("Detected video");
    } else if (
      metadata.fileType === "audio/mpeg" ||
      metadata.image?.toLowerCase().endsWith(".mp3")
    ) {
      fileType = "audio";
      console.log("Detected audio");
    }

    // Handle cover image with multiple possible metadata fields
    let coverImage = null;
    if (metadata.coverImage) {
      coverImage = metadata.coverImage;
    } else if (metadata.cover) {
      coverImage = metadata.cover;
    } else if (metadata.thumbnail) {
      coverImage = metadata.thumbnail;
    }

    // Convert cover image URL if it exists
    if (coverImage) {
      coverImage = coverImage.replace("ipfs://", gateway);
      console.log("Found cover image:", coverImage);
    }

    const processedMetadata = {
      name: metadata.name || "Unnamed NFT",
      image:
        metadata.image?.replace("ipfs://", gateway) ||
        "../assets/placeholder.jpg",
      description: metadata.description || "No description",
      attributes: metadata.attributes || [],
      fileType: fileType,
      modelDetails: metadata.modelDetails || null,
      cover: coverImage,
    };

    console.log("Processed metadata:", processedMetadata);
    return processedMetadata;
  } catch (error) {
    console.warn(`Failed to fetch metadata: ${error}`);
    return {
      name: "Unknown NFT",
      image: "../assets/placeholder.jpg",
      description: "Metadata unavailable",
      attributes: [],
      fileType: "image",
      cover: null,
    };
  }
}

// Add CSS styles for loading indicator and model-viewer
const style = document.createElement("style");
style.textContent = `
  /* Regular NFT card styles */
  .nft-item {
    width: 100%;
    position: relative;
    border-radius: 16px;
    background: white;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }

  .nft-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    border-color: rgba(0, 0, 0, 0.2);
  }

  .nft-card {
    background: white;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    height: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .nft-image {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    border-radius: 16px 16px 0 0;
    background: #f8f9fa;
  }

  .nft-media {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Audio NFT specific styles */
  .audio-cover-container {
    position: absolute !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #f8f9fa;
  }

  .audio-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
  }

  .audio-placeholder svg {
    width: 60%;
    height: 60%;
    opacity: 0.7;
  }

  .audio-indicator {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.6);
    color: white;
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 12px;
    z-index: 2;
  }

  /* 3D model specific styles */
  .nft-item.model-3d .nft-image {
    background: #f8f9fa;
  }

  .nft-item.model-3d model-viewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    --poster-color: transparent;
    background-color: transparent;
  }

  /* NFT details styles */
  .nft-details {
    padding: 16px;
    background: white;
  }

  .collection-name {
    margin-bottom: 8px;
  }

  .collection-name h3 {
    font-size: 15px;
    font-weight: 600;
    color: #000;
    margin: 0;
  }

  .price-container {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price-row .label {
    font-size: 13px;
    color: #707a83;
  }

  .price-row .value {
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }
`;
document.head.appendChild(style);
