/**
 *Submitted for verification at BscScan.com on 2022-01-25
*/

pragma solidity >=0.5.8;

interface TokenLike {
    function transferFrom(address,address,uint) external;
    function transfer(address,uint) external;
    function balanceOf(address) external view returns (uint);
}
interface NFTLike {
    function discount(address) external view returns (uint);
    function transfer(address,address,uint) external;
}
contract NftOtc {
    // --- Auth ---
    mapping (address => uint) public wards;
    address public owner;
    function rely(address usr) external  auth { require(live == 1, "NftOtc/not-live"); wards[usr] = 1; }
    function deny(address usr) external  auth { require(live == 1 && owner != usr, "NftOtc/not-live"); wards[usr] = 0; }
    modifier auth {
        require(wards[msg.sender] == 1, "NftOtc/not-authorized");
        _;
    }
    // 发布的订单数据
    struct Nftotc {
        uint256 id;         //订单
        address nft;        //Nft合约地址
        uint256 tokenid;    //NFT编码数据
        address pro;        //定价资产合约地址
        uint256 price;      //资产价格
        address seller;     //发布者地址
        address buyer;      //买入者地址   
    }
    mapping (uint256 => Nftotc)                         public nftotc;           //订单编号对应的订单
    uint256                                             public order;            //发布的总订单数量
    mapping (address => uint256)                        public ccissue;          //所有者发布的订单数
    mapping (address => uint256)                        public ccdeal;           //所有者交易订单数
    NFTLike                                             public vip;              //会员等级合同地址
    uint256                                             public startvip;         //启用VIP
    uint256                                             public live;             //系统激活标示
    uint256                                             public rati;             //手续费
    uint256                                             public swaporder;        //成交的总订单数量
    mapping (address => mapping (uint256 => uint256))   public ccowner_order;    //所有者发布的订单序号对应的订单
    mapping (address => mapping (uint256 => uint256))   public succeed;          //所有者成功交易的订单序号对应的订单
    mapping (address => mapping (uint256 => uint256))   public nftid;            //某个合约的tokenid所在的订单号

    event Notc( uint256  indexed  order, 
                address  indexed  owner,
                address  indexed  nft,
                uint256           tokenid
                );
    event Modi( uint256  indexed  order, 
                uint256           unit
                );
    event Ctaker(uint256 indexed  order, 
                address  indexed  seller,
                address  indexed  buyer
                );
           
    // --- Init ---
    constructor() public {
        owner = msg.sender;
        wards[msg.sender] = 1;
        live  = 1;
    }
    // --- Math ---
    function add(uint x, int y) internal pure returns (uint z) {
        z = x + uint(y);
        require(y >= 0 || z <= x);
        require(y <= 0 || z >= x);
    }
    function sub(uint x, int y) internal pure returns (uint z) {
        z = x - uint(y);
        require(y <= 0 || z <= x);
        require(y >= 0 || z >= x);
    }
    function mul(uint x, int y) internal pure returns (int z) {
        z = int(x) * y;
        require(int(x) >= 0);
        require(y == 0 || z / y == int(x));
    }
    function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x);
    }
    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x);
    }
    function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
          require(b != 0);
          return a % b;
    }
     // 设置vip合约地址
    function setust(address ust) external auth {
        vip = NFTLike(ust);
     }      
    //  设置手续费
    function global(uint data) external  auth {
         rati = data;   //6小数位
    }
    // 升级合约时停止系统
    function cage() external  auth {live = 0;}

    // 启动/停止 VIP
    function setVIP( ) external auth {
        if (startvip == 1) startvip = 0;
        else if (startvip == 0) startvip = 1;
     }

    // 提取手续费
    function WithAss(address pro) external  auth {
        uint256 wad = TokenLike(pro).balanceOf(address(this));
        TokenLike(pro).transfer(msg.sender, wad);
    }
     // 发布订单 
    function setNFTotc(address _nft, uint256 _tokenid, address _pro, uint256 _price) external  {
        require(live == 1 , "NftOtc/not-live");
        NFTLike(_nft).transfer(msg.sender, address(this), _tokenid);
        order += 1;
        Nftotc memory merc = nftotc[order];
            merc.id = order; 
            merc.nft = _nft;
            merc.tokenid = _tokenid;
            merc.pro = _pro;
            merc.price = _price;
            merc.seller = msg.sender;
        nftotc[order] = merc;
        ccissue[msg.sender] +=1;
        ccowner_order[msg.sender][ccissue[msg.sender]] = order;
        nftid[_nft][_tokenid] = order;
        emit Notc (order,msg.sender,_nft,_tokenid);
    }
    // 修改订单中的单价
    function modify_price(uint256 i, uint256 _price) external  {
         require(nftotc[i].seller == msg.sender, "NftOtc/not-mercher");
         nftotc[i].price = _price;
        emit Modi(i,_price);
    }
    
     // 接单
    function taker(uint256 i) external  {
        require(live == 1, "NftOtc/not-live");
        address _nft=nftotc[i].nft;
        uint256 _tokenid=nftotc[i].tokenid;
        address _pro=nftotc[i].pro;
        uint256 wad=nftotc[i].price;
        address _seller=nftotc[i].seller;
        uint256 free =  mul(wad,rati)/(10**6);
        //如果启用VIP，则判断用户是否手续费打折
        if (startvip ==1){
            uint dis = vip.discount(msg.sender);
            free = mul(free,dis)/10;
        }
        swaporder += 1;
        ccdeal[msg.sender] += 1;
        succeed[msg.sender][ccdeal[msg.sender]]= i;
        nftotc[i].buyer = msg.sender;
        TokenLike(_pro).transferFrom(msg.sender, address(this), free);
        TokenLike(_pro).transferFrom(msg.sender, _seller, sub(wad,free));
        NFTLike(_nft).transfer(address(this), msg.sender, _tokenid);
        emit Ctaker (i,_seller,msg.sender);
    } 

     // 返回订单列表
     //  @id 角色或装备类别 @_nft nft合约地址 @_pro 定价资产合约地址 
     //  @length 需要参与排序的订单数 @count 需要返回的订单数  
     function sort(uint256 id, uint256 udid,address _nft, address _pro,uint256 length,uint256 count) external 
              view returns (address[] memory, uint256[3][] memory) {
        Nftotc[] memory result = new Nftotc[](length);
        uint size;
        for (uint i = order; i >= 1; --i) {
            Nftotc memory m = nftotc[i];
            if (m.nft == _nft && (mod(m.tokenid,udid) == id || (id ==0 && udid ==0)) && m.buyer == address(0) && m.pro == _pro) {
                size +=1 ;
                for (uint j = 0; j < size; ++j) {
                    Nftotc memory n = result[j];
                    if (n.pro== address(0)) result[j] = m;
                    else if ( m.price < n.price) {
                            for (uint k = size - 1; k >= j; --k) {
                            result[k + 1] = result[k];
                            if (k==0) break;
                            }
                          result[j] = m;
                          break;
                        }
                    }
                }if (size==length) break;
            }
        if (size < count ) count = size;
        address[] memory _mad =   new address[](count);
        uint256[3][] memory _merc = new uint256[3][](count);
        
        for (uint i = 0; i < count; ++i) {
            Nftotc memory m = result[i];
            uint256[3] memory _order = [m.id,m.tokenid,m.price];
            _mad[i] = m.seller;
            _merc[i] = _order;
        }
        return (_mad, _merc);
    }
    //返回账户发布的订单列表  @count 最多返回的数量
    function ownerIssue(address usr, uint256 count) external view returns (uint256[3][] memory, address[2][] memory) {
        uint length = ccissue[usr];
        if (count < length) length = count;
        uint256[3][] memory result = new uint256[3][](length);
        address[2][] memory order_type = new address[2][](length);
        uint max = ccissue[usr];
        uint j;
        for (uint i = max; i >=1 ; --i) {
            uint n = ccowner_order[usr][i];
            Nftotc memory m = nftotc[n];
            uint256[3] memory _order = [n,m.tokenid,m.price];
            address[2] memory _type = [m.nft,m.pro];
            order_type[j] = _type;
            result[j] = _order;
            j +=1;
            if (i-1 == max-length) break;
        }
        return (result,order_type);
    }
    //返回账户交易的订单列表 @count 最多返回的数量
     function ownerDeal(address usr, uint256 count) external view returns (uint256[3][] memory,address[3][] memory) {
        uint length = ccdeal[usr];
        if (count < length) length = count;
        uint256[3][] memory result = new uint256[3][](length);
        address[3][] memory trader_address = new address[3][](length);
        uint max = ccdeal[usr];
        uint j;
        for (uint i = max; i >=1 ; --i) {
            uint n = succeed[usr][i];
            Nftotc memory m = nftotc[n];
            uint256[3] memory _order = [n,m.tokenid,m.price];
            address[3] memory _addr = [m.nft,m.pro, m.seller];
            result[j] = _order;
            trader_address[j] =_addr;
            j +=1;
            if (i-1 == max-length) break;
        }
        return (result,trader_address);
    }
}