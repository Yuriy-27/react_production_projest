import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import IconView from 'shared/assets/icons/eye-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'shared/config/routeConfig/routeConfig';
import {
  Article, ArticleBlock, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface IArticleListItemProps {
  className?: string;
  article: Article;
  viewMode: ArticleView;
}

export const ArticleListItem = memo((props: IArticleListItemProps) => {
  const {
    className,
    article,
    viewMode,
  } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePaths.article_details + article.id);
  }, [article.id, navigate]);

  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={IconView} className={cls.icon} />
    </>
  );

  if (viewMode === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block: ArticleBlock) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[viewMode]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img alt={article.title} src={article.img} className={cls.img} />
          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
          )}
          <div className={cls.footer}>
            <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINED}>
              {t('read_more')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[viewMode]])}>
      <Card onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </div>
  );
});
