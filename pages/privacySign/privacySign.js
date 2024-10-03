// pages/article/article.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        barInfo: app.globalData.barInfo,
        text1:"尊敬的用户，欢迎阅读本协议：\n您的隐私对我们（“我们”或“我们的”）很重要。并且我们致力于保护您的隐私。因此，我们制定了隐私政策。本隐私政策（“隐私政策”）解释了当您使用软件和服务时，我们如何处理您的信息并保护您的隐私，以及与您的信息有关的可用权利和选项。我们认为，您有权了解我们在使用软件和服务（“软件和服务”）时可能收集和使用的信息的做法。如果您不同意此处设定的条款和条件，请不要使用该软件和服务。\n",
        text2:"1.我们处理的信息以及处理您的信息的目的",
        text3:"1.1您提交的信息",
        text4:"（1）相机和照片（不包括面部照片）。通常，为了向您提供许多照片编辑器功能（例如模板，滤镜），您可以自愿授予我们访问相机或相册的权限，以便在您的移动设备中获取照片。我们将使用第三方提供的SDK处理照片。对于此类照片，我们既不会存储也不会与任何第三方共享。此信息对于您与我们之间的合同的适当履行是必要的。您的电话号码仅用于方便注册",
        text5:"（2）面部特征数据。首次使用面部识别功能时，您可以自愿授予我们访问相机和相册的权限，以便在移动设备中获取面部照片。只有您确认许可，我们才能访问您的相机和相册。然后，我们将使用自主研发的眼震识别系统分析眼睛特征数据，识别照片中眼震参数，并处理照片，并将效果图反馈给您。这样的效果图将不包含任何个人身份信息。对于此类数据，照片和效果图，我们既不会存储也不会与任何第三方共享。 处理此类信息的目的仅在于给您提供眼震信息方便医生进行检查。",
        text6:"（3）处理此类信息的目的仅在于为您提供随时的健康自我检测数据，用于识别眼震信息，方便您自主研判与找医生沟通",
        text7:"（4）支持相关信息。如果您通过我们的支持部分或通过电子邮件与我们联系，我们可能会收集您的联系信息，您的投诉或反馈以及您自愿提供的与此支持有关的任何信息。此类信息仅用于为您提供支持服务，不会与通过软件和服务从您那里收集的任何其他信息相关联。 您提交的信息的目的是：\n（1）操作和更新软件和服务；\n（2）改进和定制软件和服务及相关服务；\n（3）维护，测试和监视软件的质量和操作；\n（4）为您提供支持并处理您的投诉和/或反馈；\n（5）在涉及您与软件和服务有关的纠纷时采取任何措施；\n（6）遵守并满足任何适用的法律法规，法律程序或可执行的政府要求",
        text8:"2.保护个人信息",
        text9:"我们采取预防措施，包括行政，技术和物理措施，以保护您的个人信息免遭丢失，盗窃和滥用以及未经授权的访问，披露，更改和破坏。\n确保您的个人信息安全；我们会向所有员工传达我们的隐私和安全准则，并严格执行公司内部的隐私保护措施。不幸的是，互联网上的传输方法或电子存储方法都不是100％安全的。我们尽力保护您的个人信息，但是，我们不能保证其绝对安全。如果您的个人信息因安全受到破坏而被盗用，我们将立即按照适用法律通知您。\n如果您对我们的软件和服务的安全性有任何疑问，可以通过下面显示的电子邮件与我们联系。",
        text10:"3.我们将如何保留您的个人数据",
        text11:"我们保持您的信息只是为了将来您能更好的查看自己曾经的健康数据，并存储于微信的云开发服务",
        text12:"4.与第三方共享信息",
        text13:"除以下事件外，我们不会共享我们从您那里收集的任何个人识别信息：\n4.1如果法律要求我们披露您的信息，我们可能会视需要与执法机构或其他主管当局和任何第三方共享您的信息（例如，检测，预防或以其他方式解决欺诈，安全或技术问题） ；回应要求或满足任何法律程序，传票或政府要求；或保护小组用户，合作伙伴或公众的权利，财产或人身安全）；\n4.2如果团队经历了业务过渡，例如另一家公司的合并或收购，合并，控制权变更，重组或出售其全部或部分资产，则您的信息将包含在转让的资产中。",
        text14:"5.您的数据权利",
        text15:"您有权访问，修改，更正或删除我们可能收集的任何个人数据。为了行使这项权利，请通过电子邮件2067068392@qq.com与我们联系。如果您在欧洲经济区，则您有权（除少数例外情况）：\n（i）请求访问和更正或删除您的个人信息； \n（ii）获得处理限制或反对处理您的个人信息；\n （iii）要求以数字格式提供您的个人信息的副本。您也有权向EEA的本地数据保护机构投诉有关处理您的个人信息的投诉。要行使这些权利，请通过电子邮件2067068392@qq.com与我们联系。",
        text24:"6.其他",
        text25:"6.1“bravo团队”郑重提醒用户注意本协议中免除“bravo团队”责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读本协议。",
        text26:"6.2本协议的效力、解释及纠纷的解决，适用于中华人民共和国法律。若用户和“bravo团队”之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交“bravo团队”住所地有管辖权的人民法院管辖。",
        text27:"6.3本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。",
        text28:"本《协议》版权由“bravo团队”所有，“bravo团队”保留一切对本《协议》解释的权利。",
    },
    toNavigate(){
        wx.navigateTo({
          url: '/pages/logoIn/logoIn',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})