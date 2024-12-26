<div align="center">

<a href='#企業版'>
  <img src="./docs/images/ent.svg" alt="icon"/>
</a>

<h1 align="center">GroveChat</h1>

<a href='#企業版'>
  <img src="./docs/images/ent.svg" alt="icon"/>
</a>

انشر تطبيق الويب الخاص بك ChatGPT مجانًا بنقرة واحدة، ويدعم نماذج GPT3 وGPT4 وGemini Pro.

[جروفشات](https://grove-chat.vercel.app)/[إصدار المؤسسة](https://grove-chat.vercel.app)/[تجريبي](https://grove-chat.vercel.app)/[قضايا ردود الفعل](https://github.com/robbiedood/grove-chat/issues)

[<img src="https://vercel.com/button" alt="Deploy on vercel" height="30">](https://vercel.com/new/clone?repository-url=https://github.com/robbiedood/grove-chat&env=OPENAI_API_KEY&env=CLERK_SECRET_KEY&env=CLERK_WEBHOOK_SECRET&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY&project-name=grove-chat&repository-name=grove-chat)

</div>

## إصدار المؤسسة

تلبية احتياجات النشر والتخصيص الخاصة بشركتك

-   **تخصيص العلامة التجارية**: واجهة المستخدم/واجهة المستخدم (VI/UI) المصممة خصيصًا للمؤسسات، والتي تتوافق بسلاسة مع صورة العلامة التجارية للشركة
-   **تكامل الموارد**: يتم تكوين العشرات من موارد الذكاء الاصطناعي وإدارتها بشكل موحد من قبل مديري المؤسسات، ويمكن لأعضاء الفريق استخدامها خارج الصندوق
-   **إدارة الأذونات**: أذونات الأعضاء، وأذونات الموارد، وأذونات قاعدة المعرفة هي تسلسل هرمي واضح وموحد يتم التحكم فيه بواسطة لوحة الإدارة على مستوى المؤسسة
-   **الوصول إلى المعرفة**: يعد الجمع بين قاعدة المعرفة الداخلية للمؤسسة وقدرات الذكاء الاصطناعي أقرب إلى احتياجات الأعمال الخاصة بالمؤسسة من الذكاء الاصطناعي العام.
-   **التدقيق الأمني**: اعتراض الأسئلة الحساسة تلقائيًا ودعم تتبع جميع سجلات المحادثات التاريخية، مما يسمح للذكاء الاصطناعي بالامتثال أيضًا للوائح أمن معلومات الشركة
-   **النشر الخاص**: النشر الخاص على مستوى المؤسسة، ودعم العديد من عمليات نشر السحابة الخاصة السائدة لضمان أمان البيانات وحماية الخصوصية
-   **تحديثات مستمرة**: توفير خدمات التحديث والارتقاء المستمر للقدرات المتطورة مثل الوسائط المتعددة والذكاء، والتي يتم استخدامها بشكل متكرر والمتقدمة باستمرار.

استشارة حول إصدار المؤسسة: \*\*\*\*

<img width="300" src="">

## ابدأ

1.  احصل على استعداد لك[مفتاح واجهة برمجة تطبيقات OpenAI](https://platform.openai.com/account/api-keys);
2.  استخدام Clerk كإدارة أذونات المستخدم[الموقع الرسمي للكاتب](https://clerk.com/)[ملف التكوين](https://github.com/robbiedood/grove-chat/tree/main/docs)
3.  انقر فوق الزر الموجود على اليمين لبدء النشر:[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/robbiedood/grove-chat&env=OPENAI_API_KEY&env=CLERK_SECRET_KEY&env=CLERK_WEBHOOK_SECRET&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY&project-name=grove-chat&repository-name=grove-chat)، ما عليك سوى تسجيل الدخول مباشرة باستخدام حساب GitHub الخاص بك، وتذكر ملء مفتاح API و[إدارة حقوق المستخدم](#配置訪問權限Clerk)موظف؛
4.  بعد اكتمال النشر، يمكنك البدء في استخدامه؛
5.  (خياري)[ربط اسم المجال المخصص](https://vercel.com/docs/concepts/projects/domains/add-a-domain): اسم المجال DNS المخصص بواسطة Vercel ملوث في بعض المناطق. قم بربط اسم مجال مخصص للاتصال مباشرة.

<div align="center">
   
![主界面](./docs/images/cover.png)

</div>

## ابق على اطلاع

إذا اتبعت الخطوات المذكورة أعلاه لنشر مشروعك الخاص بنقرة واحدة، فقد تجد أنه يظهر لك دائمًا "يوجد تحديث". وذلك لأن Vercel سيقوم بإنشاء مشروع جديد لك بشكل افتراضي بدلاً من تقسيم هذا المشروع، وهو ما سيؤدي إلى ذلك يؤدي إلى عدم القدرة على التحقق من وجود تحديثات بشكل صحيح.  
يوصى باتباع الخطوات التالية لإعادة النشر:

-   حذف المستودع الأصلي؛
-   استخدم زر الشوكة الموجود في الركن الأيمن العلوي من الصفحة لتقسيم هذا المشروع؛
-   إعادة التحديد والنشر في Vercel،[يرجى التحقق من البرنامج التعليمي التفصيلي](./docs/vercel-cn.md#如何新建項目)。

### قم بتحديث الكود يدويًا

إذا كنت تريد التحديث يدويًا على الفور، فيمكنك التحقق من ذلك[وثائق جيثب](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)تعرف على كيفية مزامنة مشروع متشعب مع التعليمات البرمجية الأولية.

يمكنك تمييز هذا المشروع بنجمة/مشاهدته أو متابعة المؤلف للحصول على إشعارات في الوقت المناسب بشأن تحديثات الميزات الجديدة.

## تكوين كلمة مرور الوصول إلى الصفحة

> لقد تخلى هذا المشروع عن متغير البيئة CODE الخاص بالمشروع الأصلي NextChat، ويستخدم صفحة إدارة Clerk للوصول إلى البرنامج التعليمي:[كيفية تكوين كاتب](./docs/vercel-cn.md)。

## متغيرات البيئة

> يتم تعيين معظم عناصر التكوين في هذا المشروع من خلال متغيرات البيئة:[كيفية تعديل متغيرات البيئة فيرسل](./docs/vercel-cn.md)。

### `OPENAI_API_KEY`(مطلوب)

مفتاح OpenAI، مفتاح واجهة برمجة التطبيقات الذي تقدمت للحصول عليه في صفحة حساب openai، استخدم الفواصل الإنجليزية لفصل المفاتيح المتعددة، بحيث يمكن استقصاء هذه المفاتيح بشكل عشوائي.

### `CLERK_SECRET_KEY`(مطلوب)

إدارة مستخدم كاتب

### `CLERK_WEBHOOK_SECRET`(مطلوب)

إدارة مستخدم كاتب

### `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`(مطلوب)

إدارة مستخدم كاتب

### `BASE_URL`(خياري)

> تقصير:`https://api.openai.com`

> مثال:`http://your-openai-proxy.com`

عنوان URL لوكيل واجهة OpenAI، إذا قمت بتكوين وكيل واجهة openai يدويًا، فيرجى ملء هذا الخيار.

> إذا كان لديك مشاكل مع شهادة SSL، يرجى استبدالها`BASE_URL`تم ضبط البروتوكول على http.

### `OPENAI_ORG_ID`(خياري)

حدد معرف المؤسسة في OpenAI.

### `AZURE_URL`(خياري)

> الشكل مثل: https&#x3A;//{azure-resource-url}/openai

عنوان نشر Azure.

### `AZURE_API_KEY`(خياري)

مفتاح أزور.

### `AZURE_API_VERSION`(خياري)

يمكنك العثور على إصدار Azure API هنا:[وثائق أزور](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions)。

### `GOOGLE_API_KEY`(خياري)

جوجل الجوزاء برو مفتاح.

### `GOOGLE_URL`(خياري)

Google Gemini Pro Api URL.

### `ANTHROPIC_API_KEY`(خياري)

الأنثروبي كلود API Key.

### `ANTHROPIC_API_VERSION`(خياري)

إصدار الأنثروبي كلود API.

### `ANTHROPIC_URL`(خياري)

الأنثروبي كلود واجهة برمجة التطبيقات URL.

### `BAIDU_API_KEY`(خياري)

بايدو فاير كي.

### `BAIDU_SECRET_KEY`(خياري)

مفتاح بايدو السري.

### `BAIDU_URL`(خياري)

عنوان URL لواجهة برمجة تطبيقات بايدو.

### `BYTEDANCE_API_KEY`(خياري)

ByteDance مفتاح النار.

### `BYTEDANCE_URL`(خياري)

ByteDance API URL.

### `ALIBABA_API_KEY`(خياري)

مفتاح واجهة برمجة تطبيقات Alibaba Cloud (Qianwen).

### `ALIBABA_URL`(خياري)

عنوان URL لواجهة برمجة التطبيقات لـ Alibaba Cloud (Qianwen).

### `IFLYTEK_URL`(خياري)

iFlytek سبارك واجهة برمجة التطبيقات URL.

### `IFLYTEK_API_KEY`(خياري)

مفتاح iFlytek Spark API.

### `IFLYTEK_API_SECRET`(خياري)

iFlytek سبارك API السري.

### `CHATGLM_API_KEY`(خياري)

ChatGLM API Key.

### `CHATGLM_URL`(خياري)

ChatGLM Api URL.

### `XAI_API_KEY`(خياري)

XAI API مفتاح.

### `XAI_URL`(خياري)

مرحبًا أبي أورل.

### `PERPLEXITY_API_KEY`(خياري)

الحيرة API مفتاح.

### `PERPLEXITY_URL`(خياري)

حيرة واجهة برمجة التطبيقات URL.

### `MOONSHOT_API_KEY`(خياري)

مفتاح MOONSHOT API.

### `MOONSHOT_URL`(خياري)

MOONSHOT API URL

### `HIDE_USER_API_KEY`(خياري)

إذا كنت لا تريد أن يقوم المستخدمون بملء مفتاح API بأنفسهم، فما عليك سوى تعيين متغير البيئة هذا على 1.

### `DISABLE_GPT4`(خياري)

إذا كنت لا تريد أن يستخدم المستخدمون GPT-4، فما عليك سوى تعيين متغير البيئة هذا على 1.

### `ENABLE_BALANCE_QUERY`(خياري)

إذا كنت تريد تمكين وظيفة الاستعلام عن الرصيد، فما عليك سوى تعيين متغير البيئة هذا على 1.

### `DISABLE_FAST_LINK`(خياري)

إذا كنت تريد تعطيل تحليل الإعدادات الجاهزة من الروابط، فاضبط متغير البيئة هذا على 1.

### `WHITE_WEBDAV_ENDPOINTS`(خياري)

إذا كنت تريد إضافة عناوين خدمة WebDAV المسموح بالوصول إليها، فيمكنك استخدام هذا الخيار. متطلبات التنسيق هي:

-   يجب أن يكون كل عنوان نقطة نهاية كاملة
    > `https://xxxx/xxx`
-   عناوين متعددة ل`,`متصل

### `CUSTOM_MODELS`(خياري)

> مثال:`+qwen-7b-chat,+glm-6b,-gpt-3.5-turbo,gpt-4-1106-preview=gpt-4-turbo`يعني زيادة`qwen-7b-chat`و`glm-6b`إلى قائمة النماذج وإزالتها من القائمة`gpt-3.5-turbo`، وسوف`gpt-4-1106-preview`يتم عرض اسم النموذج كـ`gpt-4-turbo`。  
> إذا كنت تريد تعطيل كافة النماذج أولاً ثم تمكين نماذج معينة، فيمكنك استخدامها`-all,+gpt-3.5-turbo`، وهو ما يعني التمكين فقط`gpt-3.5-turbo`。

للتحكم في قائمة النماذج، استخدم`+`لإضافة نموذج، استخدم`-`لإخفاء نموذج، استخدم`模型名=展示名`عرض الأسماء لتخصيص النموذج، مفصولة بفواصل.

في وضع Azure، يتم دعمه للاستخدام`modelName@Azure=deploymentName`قم بتكوين اسم النموذج واسم النشر (اسم النشر).

> مثال:`+gpt-3.5-turbo@Azure=gpt35`سيعرض هذا التكوين أ`gpt35(Azure)`خيارات.  
> إذا كان بإمكانك استخدام وضع Azure فقط، فقم بتعيينه`-all,+gpt-3.5-turbo@Azure=gpt35`يمكنك جعل الاستخدام الافتراضي للمحادثة`gpt35(Azure)`。

في وضع ByteDance، دعم استخدام`modelName@bytedance=deploymentName`قم بتكوين اسم النموذج واسم النشر (اسم النشر).

> مثال:`+Doubao-lite-4k@bytedance=ep-xxxxx-xxx`سيعرض هذا التكوين أ`Doubao-lite-4k(ByteDance)`خيارات.

### `DEFAULT_MODEL`(خياري)

تغيير النموذج الافتراضي.

### `DEFAULT_INPUT_TEMPLATE`(خياري)

قم بتخصيص القالب الافتراضي الذي يتم استخدامه لتهيئة عنصر التكوين "المعالجة المسبقة لإدخال المستخدم" في "الإعدادات".

### `STABILITY_API_KEY`(خياري)

مفتاح API الاستقرار.

### `STABILITY_URL`(خياري)

عنوان طلب واجهة برمجة تطبيقات الاستقرار المخصص.

## يطور

التنمية الثانوية:

قبل البدء في كتابة التعليمات البرمجية، تحتاج إلى إنشاء واحدة جديدة في الدليل الجذر للمشروع`.env.local`الملف، املأ متغيرات البيئة:

    OPENAI_API_KEY=<your key here>
    CLERK_SECRET_KEY=<your key here>
    CLERK_WEBHOOK_SECRET=<your key here>
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key here>

    # 中國大陸用戶，可以使用本項目自帶的代理進行開發，你也可以自由選擇其他代理地址
    BASE_URL=https://b.nextweb.fun/api/proxy

### التنمية المحلية

1.  قم بتثبيت Node.js 18 وYarn، برجاء سؤال ChatGPT للحصول على التفاصيل؛
2.  ينفذ`yarn install && yarn dev`هذا كل شيء. ⚠️ ملحوظة: هذا الأمر مخصص للتطوير المحلي فقط، لا تستخدمه للنشر!
3.  إذا كنت تريد النشر محليًا، فاستخدم`yarn install && yarn build && yarn start`يمكنك استخدام الأمرpm2 لإضفاء الطابع الشيطاني على العملية لمنعها من القتل، اسأل ChatGPT للحصول على التفاصيل.

## نشر

### نشر لوحة الباغودا

> [الصينية المبسطة > كيفية النشر بنقرة واحدة عبر Pagoda](./docs/bt-cn.md)

### نشر الحاوية (مستحسن)

> يجب أن يكون إصدار Docker 20 أو أعلى، وإلا فسيطالبك بعدم العثور على الصورة.

> ⚠️ ملاحظة: في معظم الأحيان، سيتأخر إصدار Docker عن الإصدار الأحدث لمدة يوم أو يومين، لذلك ستستمر رسالة "التحديث موجود" في الظهور بعد النشر، وهو أمر طبيعي.

```shell
docker pull robbiedood/grove-chat

docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CLERK_SECRET_KEY=<your key here> \
   -e CLERK_WEBHOOK_SECRET=<your key here> \
   -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key here> \
   robbiedood/grove-chat
```

يمكنك أيضًا تحديد الوكيل:

```shell
docker run -d -p 3000:3000 \
   -e OPENAI_API_KEY=sk-xxxx \
   -e CLERK_SECRET_KEY=<your key here> \
   -e CLERK_WEBHOOK_SECRET=<your key here> \
   -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key here> \
   --net=host \
   -e PROXY_URL=http://127.0.0.1:7890 \
   robbiedood/grove-chat
```

إذا كان وكيلك المحلي يطلب حسابًا وكلمة مرور، فيمكنك استخدام:

```shell
-e PROXY_URL="http://127.0.0.1:7890 user password"
```

إذا كنت بحاجة إلى تحديد متغيرات بيئة أخرى، فيرجى إضافتها إلى الأمر أعلاه بنفسك`-e 環境變量=環境變量值`لتحديد.

### النشر المحلي

قم بتشغيل الأمر التالي على وحدة التحكم:

```shell
bash <(curl -s https://raw.githubusercontent.com/Yidadaa/ChatGPT-Next-Web/main/scripts/setup.sh)
```

⚠️ ملاحظة: إذا واجهت مشاكل أثناء التثبيت، فيرجى استخدام نشر Docker.

### المشاريع ذات الصلة

-   [ChatGPT-الويب التالي](https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web):
    منصة نموذجية كبيرة شاملة تدعم جميع نماذج اللغات الكبيرة الرئيسية في السوق.

-   [واجهة برمجة تطبيقات واحدة](https://github.com/songquanpeng/one-api): منصة واحدة لإدارة حصص النماذج الكبيرة تدعم جميع نماذج اللغات الكبيرة السائدة في السوق.

-   [السيد راندير AI مدرس](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor):مدرس الذكاء الاصطناعي

## اتفاقية مفتوحة المصدر

[مع](https://opensource.org/license/mit/)

* * *

إذا كانت هناك حاجة إلى مزيد من التعديلات أو أي شيء آخر، واسمحوا لي أن أعرف!
