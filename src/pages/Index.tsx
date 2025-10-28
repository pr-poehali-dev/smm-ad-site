import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const services = [
    {
      icon: "Target",
      title: "Таргетированная реклама",
      description: "Настройка и ведение эффективных рекламных кампаний в социальных сетях"
    },
    {
      icon: "Layout",
      title: "Контент-менеджмент",
      description: "Создание качественного контента и управление публикациями"
    },
    {
      icon: "BarChart3",
      title: "Аналитика и отчетность",
      description: "Глубокий анализ показателей и регулярные детальные отчеты"
    },
    {
      icon: "Users",
      title: "Комьюнити-менеджмент",
      description: "Работа с аудиторией, модерация и повышение вовлеченности"
    }
  ];

  const pricingPlans = [
    {
      name: "Старт",
      price: "25 000",
      description: "Идеально для начинающих проектов",
      features: [
        "3 публикации в неделю",
        "Базовая аналитика",
        "Работа с 2 соцсетями",
        "Оперативная поддержка",
        "Ежемесячный отчет"
      ],
      popular: false
    },
    {
      name: "Бизнес",
      price: "50 000",
      description: "Оптимальное решение для растущих компаний",
      features: [
        "7 публикаций в неделю",
        "Расширенная аналитика",
        "Работа с 4 соцсетями",
        "Таргетированная реклама",
        "Конкурсы и активности",
        "Еженедельные отчеты",
        "Приоритетная поддержка"
      ],
      popular: true
    },
    {
      name: "Премиум",
      price: "100 000",
      description: "Максимальный охват и профессиональный подход",
      features: [
        "Ежедневные публикации",
        "Premium аналитика",
        "Работа со всеми соцсетями",
        "Полное ведение рекламы",
        "Influencer-маркетинг",
        "Брендинг и дизайн",
        "Реал-тайм отчетность",
        "Персональный менеджер 24/7"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">SMM агентство</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Превратим ваши социальные сети в{' '}
                <span className="text-primary">мощный инструмент продаж</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Профессиональное управление социальными сетями для вашего бизнеса. 
                Увеличиваем охват, вовлеченность и конверсию через комплексный подход к SMM.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Получить консультацию
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                  Посмотреть тарифы
                </Button>
              </div>
            </div>
            <div className="animate-slide-in lg:order-last">
              <img 
                src="https://cdn.poehali.dev/projects/fb9d21c8-11db-4b4b-a3e5-7668fa83d911/files/08070648-04a0-4855-ab0e-60249a88caef.jpg" 
                alt="SMM Marketing Dashboard"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20">Наши услуги</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Комплексный подход к SMM
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Мы предоставляем полный спектр услуг для эффективного продвижения в социальных сетях
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={28} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Тарифы</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Выберите оптимальный пакет
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Прозрачные цены без скрытых платежей. Все тарифы включают персональную поддержку
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'border-primary border-2 shadow-lg scale-105' : 'border-2'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm">
                      Популярный выбор
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="mb-4">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">₽/мес</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-6">
                  <Button 
                    className="w-full" 
                    size="lg"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Выбрать тариф
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20">Связаться с нами</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Начните развитие уже сегодня
              </h2>
              <p className="text-lg text-muted-foreground">
                Оставьте заявку, и мы свяжемся с вами для обсуждения деталей сотрудничества
              </p>
            </div>
            <Card className="border-2 shadow-lg">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Имя *</label>
                      <Input 
                        placeholder="Иван Иванов" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Телефон *</label>
                      <Input 
                        type="tel"
                        placeholder="+7 (999) 123-45-67" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input 
                      type="email"
                      placeholder="info@company.ru" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сообщение</label>
                    <Textarea 
                      placeholder="Расскажите о вашем проекте и задачах..." 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full text-lg">
                    Отправить заявку
                    <Icon name="Send" className="ml-2" size={20} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">SMM Агентство</h3>
              <p className="text-sm leading-relaxed">
                Профессиональное продвижение в социальных сетях для вашего бизнеса
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@smm-agency.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="Facebook" size={24} />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="Instagram" size={24} />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="Twitter" size={24} />
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <Icon name="Linkedin" size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 SMM Агентство. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
